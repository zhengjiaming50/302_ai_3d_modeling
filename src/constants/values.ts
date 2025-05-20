/* eslint-disable camelcase */
/**
 * @fileoverview Global constants and configuration values used throughout the application.
 * @author zpl
 * @created 2024-11-20
 */

export const THEME_COOKIE_NAME = "theme";
export const EMPTY_THEME = "light";
export const TRUE_STRING = "true";
export const FALSE_STRING = "false";
export const CHINA_REGION = "0";
export const OUTSIDE_DEPLOY_MODE = "OUTSIDE";
export const INTERNAL_DEPLOY_MODE = "INTERNAL";
export const SHARE_CODE_URL_PARAM = "pwd";
export const SHARE_CODE_STORE_KEY = "share_code";
export const SHARE_CODE_REMEMBER_KEY = "share_code_remember";

export const GLOBAL = {
  /**
   * Internationalization (i18n) configuration settings.
   * @property {Object} LOCALE - Locale-related constants
   * @property {string[]} LOCALE.SUPPORTED - List of supported language codes:
   *   - 'zh': Chinese
   *   - 'en': English
   *   - 'ja': Japanese
   * @property {string} LOCALE.DEFAULT - Default language code (English)
   */
  LOCALE: {
    SUPPORTED: ["zh", "en", "ja"],
    DEFAULT: "en",
  },
  IMAGE_SAMPLE_LIST: {
    IMAGE_LIST: [
      {
        name: "sample_1",
        prompt_en:
          "Isometric 3D,A glass potion bottle filled with blue liquid, pixel art style.",
        prompt_zh: "等距3D，一个玻璃药瓶，里面装满了蓝色的液体，像素风格。",
        prompt_ja:
          "等距3D，ピクセルアートスタイルのガラスのポーションボトル、青い液体が入っています。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/c114ff60d2dfa467a95ff9c92fd0bd7a.png",
        imagePath: "/images/global/sample/sample_1.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/20250113/87a6a793a63546f6a00665577348e9c8.glb",
      },
      {
        name: "sample_2",
        prompt_en:
          "Isometric 3D,A model of an ambulance with a red and white body.",
        prompt_zh: "等距3D，一辆红色的救护车。",
        prompt_ja: "等距3D、赤と白のボディーの救護車のモデル。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/96840df8168a93506c1be4f62409956f.png",
        imagePath: "/images/global/sample/sample_2.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/20250113/6e31cb3f137248d2b3a816daae3ac100.glb",
      },
      {
        name: "sample_3",
        prompt_en:
          "Isometric 3D,A model of a traditional Chinese courtyard house, primarily featuring blue tiles, white walls, and red bricks, with columns planted in the courtyard.",
        prompt_zh:
          "等距3D，一个传统的中国庭院房屋，主要以蓝色瓷砖、白色墙壁和红色砖块为特色，庭院中种有柱子。",
        prompt_ja:
          "等距3D、青色のタイル、白い壁、赤いレンガのモデルの中国の庭園の家、庭に柱が植えられています。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/60a3dc0cf6c25f8937e4e31c426b3ca7.png",
        imagePath: "/images/global/sample/sample_3.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/20250113/603967c8777847baab3ff5ab3c3e041f.glb",
      },
      {
        name: "sample_4",
        prompt_en:
          "Isometric 3D,A model of a small room with a window on the left side, letting sunlight in. On the right side, there is a desk connected to the wall, with a computer and a few books on it, along with a chair nearby. There are also several potted green plants by the desk. The walls of the room are beige, and the floor is made of wooden planks, creating a cozy atmosphere.",
        prompt_zh:
          "等距3D，一个小的房间，左边的窗户让阳光照射进来。右边的桌子上有一台电脑和几本书，旁边还有一把椅子。桌子上还有几盆绿色的植物。房间的墙壁是米色的，地板是木制的，营造出温馨的氛围。",
        prompt_ja:
          "等距3D、小さな部屋のモデル、左側に窓があり、日光が入ります。右側には壁に接続された机があり、コンピューターといくつかの本があり、机の近くに椅子があります。机の周りにはいくつかのポットの緑の植物があります。部屋の壁はベージュ色で、床は木製の板で、ゆったりとした雰囲気があります。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/e0d7e3c7f2693a5d5da11e7e05306963.png",
        imagePath: "/images/global/sample/sample_4.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/20250113/5b1ed2949eab44faadd35ce9a05e66eb.glb",
      },
      {
        name: "sample_5",
        prompt_en:
          "Isometric 3D,A model of a music room with a floor-to-ceiling window, featuring white sheer curtains. Outside the window, there is a view of the beach. The interior has sky blue walls and dark brown flooring, with a white piano and a piano stool. There is a flower stand in the room with several potted flowers, and on the floor, a orange cat is sleeping.",
        prompt_zh:
          "等距3D，一个音乐房间，天花板到地面的窗户，窗户上挂着白色的窗帘。窗外可以看到海滩。房间内部有天蓝色的墙壁和深棕色的地板，有一架白色的钢琴和一把钢琴凳。房间里有一个花架，上面有几盆花，地板上有一只橘色的猫在睡觉。",
        prompt_ja:
          "等距3D、天井から床までの窓があり、白いシェアードカーテンがあります。窓の外には海の景色があります。内部には空の青い壁と暗い茶色の床があり、白いピアノとピアノの椅子があります。部屋には花のスタンドがあり、いくつかのポットの花があり、床にはオレンジの猫が寝ています。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/e4ef65230272b5a4104b5f04edd453b3.png",
        imagePath: "/images/global/sample/sample_5.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/20250113/f64d59897a374abb9237cc7f52397638.glb",
      },
      {
        name: "sample_6",
        prompt_en:
          "Isometric 3D,A cute Miku model with lively and adorable poses.",
        prompt_zh: "等距3D，一个可爱的初音模型，摆出活泼可爱的姿势。",
        prompt_ja:
          "等距3D、可愛いミクのモデル、生き生きとした可愛いポーズです。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/ce9000c5956d2856e52d5e1300b9a792.png",
        imagePath: "/images/global/sample/sample_6.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/9e2cfff34ef33c5413d352bbe8c22176.glb",
      },
      {
        name: "sample_7",
        prompt_en:
          "A cute, round panda model with some bamboo around it, holding and eating the bamboo.",
        prompt_zh: "一个可爱的圆形熊猫模型，周围有一些竹子，它正在吃竹子。",
        prompt_ja:
          "可愛い、丸っこいパンダのモデル、周りにいくつかの竹があり、竹を持って食べています。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/4e45d93e6afa8580e230ee04424997dd.png",
        imagePath: "/images/global/sample/sample_7.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/beee286c8f227cbf94fc0df964409164.glb",
      },
      {
        name: "sample_8",
        prompt_en: "Isometric 3D,a hamburger model.",
        prompt_zh: "等距3D，一个汉堡模型。",
        prompt_ja: "等距3D、ハンバーガーのモデル。",
        imageSrc:
          "https://file.302.ai/gpt/imgs/4be8d1a5ea2282aa210e942c7077954d.png",
        imagePath: "/images/global/sample/sample_8.png",
        modelingSrc:
          "https://file.302.ai/gpt/imgs/2c31f929ae20a52f631e9a04f46c911c.glb",
      },
    ],
  },
  TOAST_ID: {
    MODELING: "modeling",
  },
  MODELING_MODEL_OPTIONS: [
    "Trellis",
    "Tripo3D",
    "Hyper3D",
    "StableFast3D",
    "StablePoint3D",
    "OpenCV",
  ] as const,
  MODELING_FORMAT_OPTIONS: ["glb", "obj", "stl"] as const,
  MODELING_QUALITY_OPTIONS: ["low", "medium", "high", "extra-low"] as const,
  MODELING_TIER_OPTIONS: ["Sketch", "Regular"] as const,
  IMAGE_RATIO_OPTIONS: ["1:1", "4:3", "3:4", "16:9", "9:16"] as const,
};
