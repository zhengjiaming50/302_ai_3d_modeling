"use client";

import React from "react";
import ComparisonForm from "@/components/forms/ComparisonForm";

export default function ComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">3D模型对比分析</h1>
        <p className="text-gray-600 mb-8">
          上传一张图片，系统将根据图片内容分析并匹配数据库中最相似的3D模型。
          此功能使用AI标注技术来分析图片内容，并基于标签相似度寻找最佳匹配模型。
        </p>
        
        <ComparisonForm />
      </div>
    </div>
  );
} 