export type Recipe = {
  id: string;
  name: string;
  dayLabel: string;
  minutes: number;
  tools: string[];
  usedIngredients: string[];
  reason: string;
  steps: string[];
  usageLift: string;
  deliverySaving: number;
  youtubeQuery: string;
};

export type CartItem = {
  id: string;
  name: string;
  quantity: string;
  price: number;
  usedIn: string[];
  expectedUseBy: string;
  canReplace: boolean;
};

export type RetailerQuote = {
  retailer: "쿠팡" | "마켓컬리";
  totalPrice: number;
  deliveryNote: string;
  badge: string;
};

export type IngredientPlan = {
  id: string;
  ingredientName: string;
  headline: string;
  summary: string;
  days: number;
  meals: number;
  groceryCost: number;
  deliveryCostEstimate: number;
  deliverySaving: number;
  averageCookingMinutes: number;
  freshFoodUsageRate: number;
  riskLevel: string;
  ctaLabel: string;
  coachNote: string;
  priorityIngredients: string[];
  recipes: Recipe[];
  cartItems: CartItem[];
  retailerQuotes: RetailerQuote[];
};

export const ingredientPlans: IngredientPlan[] = [
  {
    id: "pork-plan",
    ingredientName: "돼지고기",
    headline: "3일 4끼 해결",
    summary: "국민 식재료, 돼지고기를 활용한 음식은 어때요?",
    days: 3,
    meals: 4,
    groceryCost: 18900,
    deliveryCostEstimate: 43000,
    deliverySaving: 24100,
    averageCookingMinutes: 12,
    freshFoodUsageRate: 92,
    riskLevel: "낮음",
    ctaLabel: "돼지고기로 3일 버티기",
    coachNote: "돼지고기와 대파는 3일 안에 대부분 소진되도록 구성했어요.",
    priorityIngredients: ["돼지고기", "대파"],
    recipes: [
      {
        id: "gochujang-pork-bowl",
        name: "제육볶음",
        dayLabel: "1일차",
        minutes: 12,
        tools: ["프라이팬"],
        usedIngredients: ["돼지고기", "대파", "밥", "고추장"],
        reason: "돼지고기 하면 가장 먼저 떠올리는 친숙한 메뉴",
        steps: [
          "팬에 돼지고기를 넣고 중불에서 볶아요.",
          "대파를 넣고 1분 더 볶아요.",
          "고추장 양념을 넣고 골고루 섞어요.",
          "밥 위에 올리면 끝이에요.",
        ],
        usageLift: "42%에서 68%",
        deliverySaving: 9000,
        youtubeQuery: "제육볶음 레시피",
      },
      {
        id: "pork-kimchi-stew",
        name: "돼지고기 김치찌개",
        dayLabel: "2일차",
        minutes: 15,
        tools: ["냄비"],
        usedIngredients: ["돼지고기", "김치", "두부", "대파"],
        reason: "남은 고기와 김치를 함께 소진",
        steps: [
          "냄비에 돼지고기와 김치를 먼저 볶아요.",
          "물을 붓고 끓인 뒤 두부를 넣어요.",
          "대파를 올리고 2분 더 끓여요.",
        ],
        usageLift: "68%에서 84%",
        deliverySaving: 8500,
        youtubeQuery: "돼지고기 김치찌개 레시피",
      },
      {
        id: "soy-pork-fried-rice",
        name: "돼지고기 김치볶음밥",
        dayLabel: "3일차",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["돼지고기", "김치", "계란", "밥"],
        reason: "밥과 김치만 있으면 바로 만들기 쉬움",
        steps: [
          "돼지고기와 김치를 팬에 볶아요.",
          "밥을 넣고 골고루 섞어요.",
          "계란 프라이를 올려 마무리해요.",
        ],
        usageLift: "84%에서 92%",
        deliverySaving: 7600,
        youtubeQuery: "돼지고기 김치볶음밥 레시피",
      },
      {
        id: "soy-pork-stir-fry",
        name: "간장 돼지고기 볶음",
        dayLabel: "예비",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["돼지고기", "대파", "간장", "밥"],
        reason: "고추장 없이도 만들 수 있는 기본 볶음",
        steps: [
          "돼지고기와 대파를 팬에 볶아요.",
          "간장과 설탕을 조금 넣고 졸이듯 볶아요.",
          "밥 위에 올려 덮밥처럼 먹어요.",
        ],
        usageLift: "84%에서 92%",
        deliverySaving: 8000,
        youtubeQuery: "간장 돼지고기 볶음 레시피",
      },
    ],
    cartItems: [
      {
        id: "pork-300g",
        name: "돼지고기 앞다리살",
        quantity: "300g",
        price: 6900,
        usedIn: ["제육볶음", "돼지고기 김치찌개", "돼지고기 김치볶음밥"],
        expectedUseBy: "3일 내 소진",
        canReplace: true,
      },
      {
        id: "green-onion-50g",
        name: "손질 대파",
        quantity: "50g",
        price: 1500,
        usedIn: ["제육볶음", "간장 돼지고기 볶음"],
        expectedUseBy: "3일 내 소진",
        canReplace: true,
      },
      {
        id: "tofu-for-stew",
        name: "두부",
        quantity: "1모",
        price: 2500,
        usedIn: ["돼지고기 김치찌개"],
        expectedUseBy: "2일 내 권장",
        canReplace: false,
      },
      {
        id: "kimchi-small-pork",
        name: "소포장 김치",
        quantity: "300g",
        price: 2200,
        usedIn: ["돼지고기 김치찌개", "돼지고기 김치볶음밥"],
        expectedUseBy: "여유 있음",
        canReplace: true,
      },
      {
        id: "eggs-6",
        name: "계란",
        quantity: "6구",
        price: 5800,
        usedIn: ["간장 돼지고기 볶음밥", "비상식"],
        expectedUseBy: "여유 있음",
        canReplace: false,
      },
    ],
    retailerQuotes: [
      {
        retailer: "쿠팡",
        totalPrice: 18900,
        deliveryNote: "소포장·즉석식 조합이 쉬움",
        badge: "추천",
      },
      {
        retailer: "마켓컬리",
        totalPrice: 20700,
        deliveryNote: "신선식품 품질 중심",
        badge: "신선",
      },
    ],
  },
  {
    id: "egg-plan",
    ingredientName: "계란",
    headline: "4일 5끼 해결",
    summary: "모든 음식에 어울리는 계란을 활용한 음식은 어때요?",
    days: 4,
    meals: 5,
    groceryCost: 13300,
    deliveryCostEstimate: 36000,
    deliverySaving: 22700,
    averageCookingMinutes: 7,
    freshFoodUsageRate: 95,
    riskLevel: "매우 낮음",
    ctaLabel: "계란으로 쉽게 시작하기",
    coachNote: "계란은 보관 여유가 있어 실패해도 다음 끼니로 넘기기 쉬워요.",
    priorityIngredients: ["계란", "밥"],
    recipes: [
      {
        id: "soy-egg-rice",
        name: "간장계란밥",
        dayLabel: "1일차",
        minutes: 5,
        tools: ["프라이팬"],
        usedIngredients: ["계란", "밥", "간장", "참기름"],
        reason: "가장 빠르게 배달을 대체",
        steps: [
          "계란 프라이를 만들어요.",
          "밥 위에 계란을 올려요.",
          "간장과 참기름을 넣고 비벼요.",
        ],
        usageLift: "35%에서 54%",
        deliverySaving: 7000,
        youtubeQuery: "간장계란밥 레시피",
      },
      {
        id: "spam-egg-fried-rice",
        name: "스팸 계란볶음밥",
        dayLabel: "2일차",
        minutes: 8,
        tools: ["프라이팬"],
        usedIngredients: ["계란", "스팸", "대파", "밥"],
        reason: "집에 있는 밥과 스팸으로 든든하게 대체",
        steps: [
          "스팸을 작게 잘라 팬에 볶아요.",
          "계란을 넣고 스크램블처럼 익혀요.",
          "밥과 대파를 넣고 간장으로 간해요.",
        ],
        usageLift: "54%에서 72%",
        deliverySaving: 7200,
        youtubeQuery: "스팸 계란볶음밥 레시피",
      },
      {
        id: "steamed-egg",
        name: "계란찜",
        dayLabel: "3일차",
        minutes: 7,
        tools: ["전자레인지 용기"],
        usedIngredients: ["계란", "물", "소금"],
        reason: "반찬 없이도 부담 없는 한 끼",
        steps: [
          "계란과 물을 1:1로 섞어요.",
          "소금으로 간하고 전자레인지에 돌려요.",
          "중간에 한 번 저은 뒤 더 익혀요.",
        ],
        usageLift: "72%에서 86%",
        deliverySaving: 6200,
        youtubeQuery: "계란찜 레시피",
      },
      {
        id: "rolled-egg",
        name: "계란말이",
        dayLabel: "예비",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["계란", "대파", "소금"],
        reason: "반찬처럼 먹어도 되고 밥과 같이 먹기 쉬움",
        steps: [
          "계란을 풀고 대파와 소금을 섞어요.",
          "팬에 얇게 붓고 접어가며 익혀요.",
          "먹기 좋은 크기로 잘라요.",
        ],
        usageLift: "86%에서 95%",
        deliverySaving: 6800,
        youtubeQuery: "계란말이 레시피",
      },
    ],
    cartItems: [
      {
        id: "eggs-10",
        name: "계란",
        quantity: "10구",
        price: 6500,
        usedIn: ["간장계란밥", "스팸 계란볶음밥", "계란찜", "계란말이"],
        expectedUseBy: "여유 있음",
        canReplace: true,
      },
      {
        id: "small-green-onion",
        name: "손질 대파",
        quantity: "50g",
        price: 1500,
        usedIn: ["스팸 계란볶음밥", "계란말이"],
        expectedUseBy: "3일 내 소진",
        canReplace: true,
      },
      {
        id: "instant-rice",
        name: "즉석밥",
        quantity: "2개",
        price: 1800,
        usedIn: ["간장계란밥", "스팸 계란볶음밥"],
        expectedUseBy: "보관 가능",
        canReplace: false,
      },
      {
        id: "spam-small",
        name: "스팸 작은 캔",
        quantity: "1개",
        price: 3500,
        usedIn: ["스팸 계란볶음밥"],
        expectedUseBy: "보관 가능",
        canReplace: true,
      },
    ],
    retailerQuotes: [
      {
        retailer: "쿠팡",
        totalPrice: 13300,
        deliveryNote: "스팸·즉석밥까지 한 번에 검색",
        badge: "최저",
      },
      {
        retailer: "마켓컬리",
        totalPrice: 15100,
        deliveryNote: "계란·대파 신선식품 중심",
        badge: "신선",
      },
    ],
  },
  {
    id: "tofu-plan",
    ingredientName: "두부",
    headline: "3일 3끼 해결",
    summary: "두부로 할 수 있는 요리들이 정말 많답니다!",
    days: 3,
    meals: 3,
    groceryCost: 12500,
    deliveryCostEstimate: 30500,
    deliverySaving: 18000,
    averageCookingMinutes: 10,
    freshFoodUsageRate: 90,
    riskLevel: "낮음",
    ctaLabel: "두부 플랜 보기",
    coachNote: "두부는 개봉 후 빨리 쓰는 편이 좋아서 첫날 메뉴에 먼저 배치했어요.",
    priorityIngredients: ["두부", "김치"],
    recipes: [
      {
        id: "tofu-kimchi",
        name: "두부김치",
        dayLabel: "1일차",
        minutes: 8,
        tools: ["프라이팬"],
        usedIngredients: ["두부", "김치"],
        reason: "소비기한 짧은 두부를 먼저 사용",
        steps: [
          "두부를 데워 먹기 좋은 크기로 잘라요.",
          "김치를 팬에 가볍게 볶아요.",
          "두부 옆에 김치를 올려 먹어요.",
        ],
        usageLift: "38%에서 64%",
        deliverySaving: 7800,
        youtubeQuery: "두부김치 레시피",
      },
      {
        id: "doenjang-stew",
        name: "된장찌개",
        dayLabel: "2일차",
        minutes: 12,
        tools: ["냄비"],
        usedIngredients: ["두부", "대파", "양파", "된장"],
        reason: "남은 두부와 채소를 함께 소진",
        steps: [
          "물에 된장을 풀고 끓여요.",
          "양파와 두부를 넣고 익혀요.",
          "대파를 넣고 1분 더 끓여요.",
        ],
        usageLift: "64%에서 78%",
        deliverySaving: 8200,
        youtubeQuery: "두부 된장찌개 레시피",
      },
      {
        id: "braised-tofu",
        name: "두부조림",
        dayLabel: "3일차",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["두부", "간장", "대파", "밥"],
        reason: "간장 양념만 있으면 익숙한 밥반찬으로 정리",
        steps: [
          "두부를 도톰하게 썰어 팬에 구워요.",
          "간장 양념과 대파를 넣고 조려요.",
          "밥과 함께 먹어요.",
        ],
        usageLift: "78%에서 90%",
        deliverySaving: 6900,
        youtubeQuery: "두부조림 레시피",
      },
    ],
    cartItems: [
      {
        id: "tofu-two",
        name: "두부",
        quantity: "2모",
        price: 5000,
        usedIn: ["두부김치", "된장찌개", "두부조림"],
        expectedUseBy: "3일 내 소진",
        canReplace: true,
      },
      {
        id: "kimchi-small",
        name: "소포장 김치",
        quantity: "300g",
        price: 4500,
        usedIn: ["두부김치"],
        expectedUseBy: "여유 있음",
        canReplace: true,
      },
      {
        id: "onion-one",
        name: "양파",
        quantity: "1개",
        price: 1200,
        usedIn: ["된장찌개"],
        expectedUseBy: "3일 내 권장",
        canReplace: false,
      },
      {
        id: "green-onion-tofu",
        name: "손질 대파",
        quantity: "50g",
        price: 1800,
        usedIn: ["된장찌개", "두부조림"],
        expectedUseBy: "3일 내 권장",
        canReplace: true,
      },
    ],
    retailerQuotes: [
      {
        retailer: "쿠팡",
        totalPrice: 12900,
        deliveryNote: "상온 양념과 함께 사기 쉬움",
        badge: "간편",
      },
      {
        retailer: "마켓컬리",
        totalPrice: 12500,
        deliveryNote: "두부·김치 소포장 조합 추천",
        badge: "추천",
      },
    ],
  },
];

export const defaultPlanId = "pork-plan";

export function getPlan(planId: string | undefined): IngredientPlan {
  return ingredientPlans.find((plan) => plan.id === planId) ?? ingredientPlans[0];
}

export function getRecipe(recipeId: string | undefined): {
  plan: IngredientPlan;
  recipe: Recipe;
} {
  for (const plan of ingredientPlans) {
    const recipe = plan.recipes.find((item) => item.id === recipeId);
    if (recipe) {
      return { plan, recipe };
    }
  }

  return { plan: ingredientPlans[0], recipe: ingredientPlans[0].recipes[0] };
}
