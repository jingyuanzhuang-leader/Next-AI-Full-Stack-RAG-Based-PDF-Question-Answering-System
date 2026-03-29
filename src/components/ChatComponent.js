import React from "react";
import {
  Input,
  Button,
  Card,
  Empty,
  Typography,
  Space,
  Select,
} from "antd";
import {
  AudioOutlined,
  StopOutlined,
  SoundOutlined,
  PauseCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { LANGUAGE_MAP } from "../constants/config";
import useChatHistory from "../hooks/useChatHistory";
import useSpeechControls from "../hooks/useSpeechControls";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const ChatComponent = ({ uploadedFileName, uploadVersion }) => {
  const {
    question,
    setQuestion,
    chatHistory,
    loading,
    lastAnswer,
    handleAsk,
    handleClear,
  } = useChatHistory({
    uploadedFileName,
    uploadVersion,
  });

  const {
    selectedLanguage,
    setSelectedLanguage,
    listening,
    resetTranscript,
    startRecording,
    stopRecording,
    readText,
    stopReading,
  } = useSpeechControls({
    onTranscriptChange: setQuestion,
  });

  const handleAskWithTranscriptReset = async () => {
    const success = await handleAsk();
    if (success) {
      resetTranscript();
    }
  };

  const handleCopyAnswer = async (answer) => {
    try {
      await navigator.clipboard.writeText(answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ fontSize: 16 }}>
          输入你的问题
        </Text>
      </div>

      <Space wrap style={{ marginBottom: 14 }}>
        <Text>语音语言：</Text>
        <Select
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          style={{ width: 140 }}
        >
          <Option value="zh-CN">中文</Option>
          <Option value="en-US">English</Option>
        </Select>
      </Space>

      <TextArea
        rows={4}
        placeholder="请输入你想问 PDF 的问题"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleAskWithTranscriptReset();
          }
        }}
        style={{
          borderRadius: 12,
          padding: 14,
        }}
      />

      <Space wrap style={{ marginTop: 14, marginBottom: 24 }}>
        <Button
          type="primary"
          onClick={handleAskWithTranscriptReset}
          loading={loading}
          style={{ borderRadius: 10 }}
        >
          {loading ? "提问中..." : "提问"}
        </Button>

        <Button
          icon={<AudioOutlined />}
          onClick={startRecording}
          disabled={listening}
          style={{ borderRadius: 10 }}
        >
          开始录音
        </Button>

        <Button
          icon={<StopOutlined />}
          onClick={stopRecording}
          disabled={!listening}
          style={{ borderRadius: 10 }}
        >
          停止录音
        </Button>

        <Button
          icon={<SoundOutlined />}
          onClick={() => readText(lastAnswer)}
          style={{ borderRadius: 10 }}
        >
          朗读回答
        </Button>

        <Button
          icon={<PauseCircleOutlined />}
          onClick={stopReading}
          style={{ borderRadius: 10 }}
        >
          停止朗读
        </Button>

        <Button
          onClick={handleClear}
          disabled={chatHistory.length === 0}
          style={{ borderRadius: 10 }}
        >
          清空记录
        </Button>
      </Space>

      <div style={{ marginBottom: 16 }}>
        <Text type="secondary">
          当前语言：{LANGUAGE_MAP[selectedLanguage]} ｜ 录音状态：
          {listening ? "正在录音..." : "未录音"}
        </Text>
      </div>

      <div>
        {chatHistory.length === 0 ? (
          <Card
            title="问答记录"
            style={{
              borderRadius: 16,
            }}
          >
            <Empty description="这里会显示问答记录" />
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {chatHistory.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      background: "#1677ff",
                      color: "white",
                      padding: "12px 16px",
                      borderRadius: "16px 16px 4px 16px",
                      boxShadow: "0 4px 12px rgba(22,119,255,0.18)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>
                      你 · {item.time}
                    </div>
                    <div>{item.question}</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      padding: "12px 16px",
                      borderRadius: "16px 16px 16px 4px",
                      boxShadow: "0 4px 12px rgba(15,23,42,0.06)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#667085",
                        marginBottom: 6,
                      }}
                    >
                      PDF Assistant · {item.time}
                    </div>

                    <div>{item.answer}</div>

                    <div style={{ marginTop: 10 }}>
                      <Text type="secondary">
                        来源页码：
                        {item.sourcePages && item.sourcePages.length > 0
                          ? item.sourcePages.join(", ")
                          : "未识别"}
                      </Text>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => handleCopyAnswer(item.answer)}
                      >
                        复制回答
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;