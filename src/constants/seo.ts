export type SEOData = {
  supportLanguages: string[];
  fallbackLanguage: string;
  languages: Record<
    string,
    { title: string; description: string; image: string }
  >;
};

export const SEO_DATA: SEOData = {
  // TODO: Change to your own support languages
  supportLanguages: ["zh", "en", "ja"],
  fallbackLanguage: "en",
  // TODO: Change to your own SEO data
  languages: {
    zh: {
      title: "AI 3D建模",
      description: "使用AI将图片转成3D模型",
      image: "/images/global/desc_zh.png",
    },
    en: {
      title: "AI 3D Modeling",
      description: "Use AI to convert images into 3D models",
      image: "/images/global/desc_en.png",
    },
    ja: {
      title: "AI 3D モデリング",
      description: "AIを使って画像を3Dモデルに変換する",
      image: "/images/global/desc_ja.png",
    },
  },
};
