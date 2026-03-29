import React, { useState } from "react";
import "antd/dist/reset.css";
import { Layout, Typography, Card, Divider, Space, Button, message } from "antd";
import { resetPdf } from "./services/api";
import PdfUploader from "./components/PdfUploader";
import ChatComponent from "./components/ChatComponent";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function App() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadVersion, setUploadVersion] = useState(0);

  const handleRemoveFile = async () => {
    try {
      await resetPdf();
      setUploadedFileName("");
      setUploadVersion((prev) => prev + 1);
      message.success("当前 PDF 已删除");
    } catch (error) {
      console.error(error);
      message.error("删除当前 PDF 失败");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#001529",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Title level={2} style={{ color: "white", margin: 0 }}>
          PDF Chat App
        </Title>
      </Header>

      <Content style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Card
            style={{
              borderRadius: 20,
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
              border: "1px solid #eef2f7",
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <Title level={3} style={{ marginBottom: 8 }}>
                与你的 PDF 对话
              </Title>
              <Paragraph style={{ color: "#667085", marginBottom: 0 }}>
                先上传一个 PDF，然后输入问题，系统会基于文档内容回答你，并显示来源页码。
              </Paragraph>
            </div>

            <PdfUploader
              setUploadedFileName={setUploadedFileName}
              setUploadVersion={setUploadVersion}
            />

            {uploadedFileName ? (
              <div
                style={{
                  marginTop: 18,
                  padding: "12px 16px",
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                }}
              >
                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                  <div>
                    <Text strong>当前文件：</Text>
                    <Text>{uploadedFileName}</Text>
                  </div>
                  <Button danger onClick={handleRemoveFile} style={{ width: "fit-content" }}>
                    删除当前文件
                  </Button>
                </Space>
              </div>
            ) : null}

            <Divider style={{ margin: "28px 0 24px" }} />

            <ChatComponent
              uploadedFileName={uploadedFileName}
              uploadVersion={uploadVersion}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

export default App;