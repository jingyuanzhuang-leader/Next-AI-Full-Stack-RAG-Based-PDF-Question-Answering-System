import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadPdf } from "../services/api";

const PdfUploader = ({ setUploadedFileName, setUploadVersion }) => {
  const [uploading, setUploading] = useState(false);

  const props = {
    name: "file",
    accept: ".pdf",
    showUploadList: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        setUploading(true);

        const data = await uploadPdf(file);

        setUploadedFileName(data.fileName || file.name);
        setUploadVersion((prev) => prev + 1);

        message.success("PDF 上传成功，旧问答已清空");
        onSuccess(data);
      } catch (error) {
        console.error("Upload error:", error);
        const backendMessage = error?.response?.data;
        message.error(`上传失败：${backendMessage || error.message}`);
        onError(error);
      } finally {
        setUploading(false);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />} loading={uploading}>
        {uploading ? "上传中..." : "上传 PDF"}
      </Button>
    </Upload>
  );
};

export default PdfUploader;