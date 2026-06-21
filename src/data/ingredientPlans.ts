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
};

export const ingredientPlans: IngredientPlan[] = [
  {
    id: "pork-plan",
    ingredientName: "돼지고기",
    headline: "3일 4끼 해결",
    summary: "배달 대체감이 가장 큰 첫 플랜",
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
        name: "고추장 제육덮밥",
        dayLabel: "1일차",
        minutes: 12,
        tools: ["프라이팬"],
        usedIngredients: ["돼지고기", "대파", "밥", "고추장"],
        reason: "가장 맛 보장이 쉬운 첫 끼",
        steps: [
          "팬에 돼지고기를 넣고 중불에서 볶아요.",
          "대파를 넣고 1분 더 볶아요.",
          "고추장 양념을 넣고 골고루 섞어요.",
          "밥 위에 올리면 끝이에요.",
        ],
        usageLift: "42%에서 68%",
        deliverySaving: 9000,
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
      },
      {
        id: "soy-pork-fried-rice",
        name: "간장 돼지고기 볶음밥",
        dayLabel: "3일차",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["돼지고기", "계란", "대파", "밥"],
        reason: "남은 밥과 대파 처리",
        steps: [
          "대파와 돼지고기를 팬에 볶아요.",
          "밥과 간장을 넣고 섞어요.",
          "계란을 넣고 빠르게 볶아 마무리해요.",
        ],
        usageLift: "84%에서 92%",
        deliverySaving: 7600,
      },
      {
        id: "pork-udon",
        name: "돼지고기 볶음우동",
        dayLabel: "예비",
        minutes: 12,
        tools: ["프라이팬"],
        usedIngredients: ["돼지고기", "우동면", "대파"],
        reason: "밥이 없을 때 대체",
        steps: [
          "우동면을 살짝 데워 풀어둬요.",
          "돼지고기와 대파를 팬에 볶아요.",
          "우동면과 간장 양념을 넣고 볶아요.",
        ],
        usageLift: "84%에서 92%",
        deliverySaving: 8000,
      },
    ],
    cartItems: [
      {
        id: "pork-300g",
        name: "돼지고기 앞다리살",
        quantity: "300g",
        price: 6900,
        usedIn: ["고추장 제육덮밥", "돼지고기 김치찌개", "간장 돼지고기 볶음밥"],
        expectedUseBy: "3일 내 소진",
        canReplace: true,
      },
      {
        id: "green-onion-50g",
        name: "손질 대파",
        quantity: "50g",
        price: 1500,
        usedIn: ["고추장 제육덮밥", "간장 돼지고기 볶음밥"],
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
        id: "udon-noodle",
        name: "우동면",
        quantity: "1개",
        price: 2200,
        usedIn: ["돼지고기 볶음우동"],
        expectedUseBy: "보관 가능",
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
  },
  {
    id: "egg-plan",
    ingredientName: "계란",
    headline: "4일 5끼 해결",
    summary: "요리가 귀찮은 주에 실패 가능성이 낮아요",
    days: 4,
    meals: 5,
    groceryCost: 9800,
    deliveryCostEstimate: 29800,
    deliverySaving: 20000,
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
      },
      {
        id: "egg-fried-rice",
        name: "계란볶음밥",
        dayLabel: "2일차",
        minutes: 8,
        tools: ["프라이팬"],
        usedIngredients: ["계란", "대파", "밥"],
        reason: "남은 밥과 대파 처리",
        steps: [
          "대파를 먼저 볶아 향을 내요.",
          "계란을 넣고 스크램블처럼 익혀요.",
          "밥을 넣고 간장으로 간해요.",
        ],
        usageLift: "54%에서 72%",
        deliverySaving: 7200,
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
      },
      {
        id: "omelet-rice",
        name: "오므라이스",
        dayLabel: "예비",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["계란", "밥", "케첩"],
        reason: "냉장고 자투리 재료를 함께 처리",
        steps: [
          "밥과 자투리 재료를 볶아요.",
          "얇게 부친 계란을 밥 위에 덮어요.",
          "케첩을 곁들여 마무리해요.",
        ],
        usageLift: "86%에서 95%",
        deliverySaving: 6800,
      },
    ],
    cartItems: [
      {
        id: "eggs-10",
        name: "계란",
        quantity: "10구",
        price: 6500,
        usedIn: ["간장계란밥", "계란볶음밥", "계란찜", "오므라이스"],
        expectedUseBy: "여유 있음",
        canReplace: true,
      },
      {
        id: "small-green-onion",
        name: "손질 대파",
        quantity: "50g",
        price: 1500,
        usedIn: ["계란볶음밥"],
        expectedUseBy: "3일 내 소진",
        canReplace: true,
      },
      {
        id: "instant-rice",
        name: "즉석밥",
        quantity: "2개",
        price: 1800,
        usedIn: ["간장계란밥", "계란볶음밥", "오므라이스"],
        expectedUseBy: "보관 가능",
        canReplace: false,
      },
    ],
  },
  {
    id: "tofu-plan",
    ingredientName: "두부",
    headline: "3일 3끼 해결",
    summary: "저렴하고 가벼운 식사를 만들기 좋아요",
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
      },
      {
        id: "mapo-tofu-rice",
        name: "마파두부덮밥",
        dayLabel: "3일차",
        minutes: 10,
        tools: ["프라이팬"],
        usedIngredients: ["두부", "양념", "밥"],
        reason: "마지막 두부를 한 그릇 메뉴로 정리",
        steps: [
          "두부를 깍둑썰기해요.",
          "양념과 물을 팬에 넣고 끓여요.",
          "두부를 넣어 조린 뒤 밥 위에 올려요.",
        ],
        usageLift: "78%에서 90%",
        deliverySaving: 6900,
      },
    ],
    cartItems: [
      {
        id: "tofu-two",
        name: "두부",
        quantity: "2모",
        price: 5000,
        usedIn: ["두부김치", "된장찌개", "마파두부덮밥"],
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
        id: "mapo-sauce",
        name: "마파두부 소스",
        quantity: "1팩",
        price: 1800,
        usedIn: ["마파두부덮밥"],
        expectedUseBy: "보관 가능",
        canReplace: true,
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
