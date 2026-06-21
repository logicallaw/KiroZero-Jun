import { useEffect, useMemo, useState } from "react";
import {
  defaultPlanId,
  getPlan,
  getRecipe,
  ingredientPlans,
  type IngredientPlan,
  type Recipe,
  type RetailerQuote,
} from "./data/ingredientPlans";
import { formatWon, perMealCost } from "./lib/format";

type Route =
  | { name: "home" }
  | { name: "onboarding" }
  | { name: "plans" }
  | { name: "planDetail"; planId: string }
  | { name: "cart"; planId: string }
  | { name: "fridge"; planId: string }
  | { name: "cook"; recipeId: string };

function parseRoute(pathname: string, search: string): Route {
  const parts = pathname.split("/").filter(Boolean);
  const params = new URLSearchParams(search);
  const planId = params.get("plan") ?? defaultPlanId;

  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "onboarding") return { name: "onboarding" };
  if (parts[0] === "plans" && parts[1]) return { name: "planDetail", planId: parts[1] };
  if (parts[0] === "plans") return { name: "plans" };
  if (parts[0] === "cart") return { name: "cart", planId };
  if (parts[0] === "fridge") return { name: "fridge", planId };
  if (parts[0] === "cook" && parts[1]) return { name: "cook", recipeId: parts[1] };
  return { name: "home" };
}

function href(path: string): string {
  return path;
}

function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function retailerSearchUrl(retailer: RetailerQuote["retailer"], plan: IngredientPlan): string {
  const query = plan.cartItems.map((item) => item.name).join(" ");

  if (retailer === "쿠팡") {
    return `https://www.coupang.com/np/search?q=${encodeURIComponent(query)}`;
  }

  return `https://www.kurly.com/search?sword=${encodeURIComponent(query)}`;
}

function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname, window.location.search));

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname, window.location.search));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setRoute(parseRoute(window.location.pathname, window.location.search));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return { route, navigate };
}

type NavProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onNavigate: (to: string) => void;
};

function NavLink({ to, children, className, onNavigate }: NavProps) {
  return (
    <a
      className={className}
      href={href(to)}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(to);
      }}
    >
      {children}
    </a>
  );
}

function AppShell({ children, onNavigate }: { children: React.ReactNode; onNavigate: (to: string) => void }) {
  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand" onNavigate={onNavigate}>
          혼밥 장보기 코치
        </NavLink>
        <nav className="nav">
          <NavLink to="/onboarding" onNavigate={onNavigate}>
            온보딩
          </NavLink>
          <NavLink to="/plans" onNavigate={onNavigate}>
            플랜
          </NavLink>
          <NavLink to={`/fridge?plan=${defaultPlanId}`} onNavigate={onNavigate}>
            냉장고 코치
          </NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SavingSummary({ plan }: { plan: IngredientPlan }) {
  return (
    <section className="saving-summary" aria-label="절약 요약">
      <div>
        <span>배달로 먹으면</span>
        <strong>{formatWon(plan.deliveryCostEstimate)}</strong>
      </div>
      <div>
        <span>직접 만들면</span>
        <strong>{formatWon(plan.groceryCost)}</strong>
      </div>
      <div className="saving-highlight">
        <span>예상 절약</span>
        <strong>{formatWon(plan.deliverySaving)}</strong>
      </div>
    </section>
  );
}

function PlanImpact({ plan }: { plan: IngredientPlan }) {
  const groceryRatio = Math.max(18, Math.round((plan.groceryCost / plan.deliveryCostEstimate) * 100));
  const savingRate = Math.round((plan.deliverySaving / plan.deliveryCostEstimate) * 100);

  return (
    <div className="plan-impact">
      <div className="impact-lead">
        <span>배달비를 장보기로 바꾸면</span>
        <strong>{formatWon(plan.deliverySaving)} 절약</strong>
        <p>장보기 비용은 배달 예상 비용의 {groceryRatio}% 수준이에요.</p>
      </div>
      <div className="cost-switch">
        <div className="cost-box delivery-cost">
          <span>배달 예상</span>
          <strong>{formatWon(plan.deliveryCostEstimate)}</strong>
        </div>
        <span className="cost-arrow">-&gt;</span>
        <div className="cost-box grocery-cost">
          <span>장보기</span>
          <strong>{formatWon(plan.groceryCost)}</strong>
        </div>
      </div>
      <div className="cost-compare" aria-label={`${plan.ingredientName} 비용 비교`}>
        <div className="cost-row">
          <span>배달</span>
          <div className="cost-track">
            <div className="cost-fill delivery" style={{ width: "100%" }} />
          </div>
          <strong>{formatWon(plan.deliveryCostEstimate)}</strong>
        </div>
        <div className="cost-row">
          <span>장보기</span>
          <div className="cost-track">
            <div className="cost-fill grocery" style={{ width: `${groceryRatio}%` }} />
          </div>
          <strong>{formatWon(plan.groceryCost)}</strong>
        </div>
      </div>
      <div className="impact-badges">
        <span>{savingRate}% 절감</span>
        <span>{formatWon(perMealCost(plan.groceryCost, plan.meals))} / 한 끼</span>
        <span>소진율 {plan.freshFoodUsageRate}%</span>
      </div>
    </div>
  );
}

function PlanCard({ plan, onNavigate }: { plan: IngredientPlan; onNavigate: (to: string) => void }) {
  return (
    <article className="plan-card">
      <div className="plan-card-header">
        <div>
          <p className="eyebrow">{plan.summary}</p>
          <h3>{plan.ingredientName}</h3>
        </div>
        <span className="risk-pill">위험 {plan.riskLevel}</span>
      </div>
      <div className="headline-row">
        <strong>{plan.headline}</strong>
        <span>평균 {plan.averageCookingMinutes}분</span>
      </div>
      <PlanImpact plan={plan} />
      <div className="recipe-preview">
        <span>만들 수 있는 것</span>
        <ul>
          {plan.recipes.slice(0, 3).map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      </div>
      <NavLink to={`/cart?plan=${plan.id}`} className="button primary full" onNavigate={onNavigate}>
        식재료 바로 구매
      </NavLink>
    </article>
  );
}

function RecipeVideoCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="recipe-video-card">
      <a
        className="video-thumb"
        href={youtubeSearchUrl(recipe.youtubeQuery)}
        target="_blank"
        rel="noreferrer"
        aria-label={`${recipe.name} 유튜브 영상 찾기`}
      >
        <span className="youtube-badge">YouTube</span>
        <strong>{recipe.name}</strong>
        <span className="play-button">▶</span>
      </a>
      <div className="recipe-video-body">
        <div>
          <h3>{recipe.name}</h3>
          <p>{recipe.reason}</p>
        </div>
        <div className="recipe-meta-row">
          <span>{recipe.minutes}분</span>
          <span>{recipe.tools.join(", ")}</span>
        </div>
        <p className="ingredient-line">{recipe.usedIngredients.join(", ")}</p>
      </div>
    </article>
  );
}

function CuratedPlanCarousel({ onNavigate }: { onNavigate: (to: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const activePlan = ingredientPlans[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideDirection("next");
      setActiveIndex((current) => (current + 1) % ingredientPlans.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const moveSlide = (direction: "next" | "prev") => {
    setSlideDirection(direction);
    setActiveIndex((current) => {
      if (direction === "next") {
        return (current + 1) % ingredientPlans.length;
      }

      return (current - 1 + ingredientPlans.length) % ingredientPlans.length;
    });
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) return;

    const distance = touchStart - clientX;
    setTouchStart(null);

    if (Math.abs(distance) < 42) return;
    moveSlide(distance > 0 ? "next" : "prev");
  };

  return (
    <section className="curation-section">
      <div className="section-heading compact">
        <h2>이번주는 배달보다 요리는 어떠신가요?</h2>
      </div>
      <article
        className={`curation-card slide-${slideDirection}`}
        key={activePlan.id}
        onMouseDown={(event) => setTouchStart(event.clientX)}
        onMouseUp={(event) => handleTouchEnd(event.clientX)}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="curation-copy">
          <p className="eyebrow">{activePlan.summary}</p>
          <h3>{activePlan.ingredientName}</h3>
          {/* <p>
            배달로 먹으면 {formatWon(activePlan.deliveryCostEstimate)}, 장보기로 준비하면{" "}
            {formatWon(activePlan.groceryCost)}이에요. 필요한 재료를 바로 장바구니로 담아볼 수 있어요.
          </p> */}
          <div className="curation-actions">
            <NavLink to={`/cart?plan=${activePlan.id}`} className="button primary" onNavigate={onNavigate}>
              식재료 바로 구매
            </NavLink>
            <NavLink to={`/plans/${activePlan.id}`} className="button secondary" onNavigate={onNavigate}>
              추천 레시피
            </NavLink>
          </div>
        </div>
        <div className="curation-visual">
          <PlanImpact plan={activePlan} />
          <div className="curation-kicker">
            <span>이 장보기로</span>
            <strong>{activePlan.days}일 {activePlan.meals}끼</strong>
          </div>
          <div className="ingredient-strip">
            <span>장바구니 재료</span>
            <p>{activePlan.cartItems.slice(0, 4).map((item) => item.name).join(", ")}</p>
          </div>
          <div className="curation-menu">
            <span>이 재료로 가능한 요리</span>
            {activePlan.recipes.slice(0, 3).map((recipe) => (
              <p key={recipe.id}>
                <strong>{recipe.minutes}분</strong>
                {recipe.name}
              </p>
            ))}
          </div>
        </div>
      </article>
      <div className="carousel-progress" aria-label="추천 플랜 진행 상태">
        {ingredientPlans.map((plan, index) => (
          <span className={index === activeIndex ? "active" : ""} key={plan.id} />
        ))}
      </div>
    </section>
  );
}

function HomePage({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <div className="page-stack">
      <CuratedPlanCarousel onNavigate={onNavigate} />
    </div>
  );
}

function OnboardingPage({ onNavigate }: { onNavigate: (to: string) => void }) {
  const questions = [
    { label: "배달 줄이기", options: ["1번", "2번", "3번 이상"], selected: "2번" },
    { label: "집밥 끼니", options: ["2끼", "3~4끼", "5끼 이상"], selected: "3~4끼" },
    { label: "조리 시간", options: ["5분", "10분", "15분", "상관없음"], selected: "15분" },
    { label: "보유 재료", options: ["밥", "계란", "김치", "대파", "간장"], selected: "밥" },
  ];

  return (
    <section className="narrow-page">
      <p className="eyebrow">Mock onboarding</p>
      <h1>이번 주 장보기 불안을 줄이는 기본값으로 추천할게요.</h1>
      <div className="question-list">
        {questions.map((question) => (
          <div className="question" key={question.label}>
            <strong>{question.label}</strong>
            <div className="chip-row">
              {question.options.map((option) => (
                <span className={option === question.selected ? "chip selected" : "chip"} key={option}>
                  {option}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <NavLink to="/plans" className="button primary full" onNavigate={onNavigate}>
        추천 플랜 보기
      </NavLink>
    </section>
  );
}

function PlansPage({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <section className="page-stack">
      <div className="section-heading">
        <p className="eyebrow">추천 결과</p>
        <h1>이번 주는 3개 재료 플랜만 비교해보세요.</h1>
        <p>각 플랜은 15분 이하 조리, 배달 대비 절약액, 3일 안쪽 소진 계획을 기준으로 구성했어요.</p>
      </div>
      <div className="plan-grid">
        {ingredientPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}

function PlanDetailPage({ planId, onNavigate }: { planId: string; onNavigate: (to: string) => void }) {
  const plan = getPlan(planId);

  return (
    <div className="page-stack">
      <section className="detail-hero">
        <div>
          <p className="eyebrow">추천 레시피</p>
          <h1>{plan.ingredientName}로 만들기 쉬운 요리</h1>
          <p>익숙한 재료와 집에 있을 법한 양념으로 만들 수 있는 메뉴만 골랐어요.</p>
        </div>
        <SavingSummary plan={plan} />
      </section>
      <section className="metric-band">
        <Metric label="한 끼 단가" value={formatWon(perMealCost(plan.groceryCost, plan.meals))} />
        <Metric label="평균 조리 시간" value={`${plan.averageCookingMinutes}분`} />
        <Metric label="신선식품 소진율" value={`${plan.freshFoodUsageRate}%`} />
        <Metric label="소비기한 위험" value={plan.riskLevel} />
      </section>
      <section className="section">
        <div className="section-heading compact">
          <p className="eyebrow">YouTube recipe</p>
          <h2>보고 따라 하기 쉬운 레시피를 찾아볼까요?</h2>
        </div>
        <div className="recipe-video-grid">
          {plan.recipes.map((recipe) => (
            <RecipeVideoCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
        <p className="coach-note">{plan.coachNote}</p>
        <NavLink to={`/cart?plan=${plan.id}`} className="button primary" onNavigate={onNavigate}>
          식재료 바로 구매
        </NavLink>
      </section>
    </div>
  );
}

function CartPage({ planId, onNavigate }: { planId: string; onNavigate: (to: string) => void }) {
  const plan = getPlan(planId);
  const total = plan.cartItems.reduce((sum, item) => sum + item.price, 0);
  const bestQuote = plan.retailerQuotes.reduce((best, quote) => (quote.totalPrice < best.totalPrice ? quote : best));

  return (
    <div className="page-stack">
      <section className="section-heading">
        <p className="eyebrow">식재료 바로 구매</p>
        <h1>{plan.ingredientName} 장보기 비교</h1>
        <p>필요한 재료를 한 사이트에서 살 수 있도록 구매 후보를 비교했어요. 최종 가격은 이동한 사이트에서 확인하세요.</p>
      </section>
      <section className="retailer-section">
        <div className="retailer-heading">
          <div>
            <p className="eyebrow">추천 구매처</p>
            <h2>{bestQuote.retailer}에서 시작하는 게 좋아요.</h2>
          </div>
          <strong>{formatWon(bestQuote.totalPrice)}</strong>
        </div>
        <div className="retailer-grid">
          {plan.retailerQuotes.map((quote) => (
            <article className={quote.retailer === bestQuote.retailer ? "retailer-card selected" : "retailer-card"} key={quote.retailer}>
              <div className="retailer-card-top">
                <span>{quote.badge}</span>
                <h3>{quote.retailer}</h3>
              </div>
              <strong>{formatWon(quote.totalPrice)}</strong>
              <p>{quote.deliveryNote}</p>
              <a className="button primary full" href={retailerSearchUrl(quote.retailer, plan)} target="_blank" rel="noreferrer">
                {quote.retailer}에서 바로 구매
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="cart-layout">
        <div className="cart-list">
          {plan.cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.quantity} · {item.usedIn.join(", ")}</p>
              </div>
              <div className="cart-meta">
                <strong>{formatWon(item.price)}</strong>
                <span>{item.expectedUseBy}</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <span>예상 합계</span>
          <strong>{formatWon(total)}</strong>
          <p>이미 집에 있는 재료는 빼고 구매할 수 있어요.</p>
          <div className="option-grid">
            <button type="button">있는 재료 빼기</button>
            <button type="button">더 저렴하게</button>
            <button type="button">냉동 위주</button>
            <button type="button">조리 더 쉽게</button>
          </div>
          <NavLink to={`/fridge?plan=${plan.id}`} className="button primary full" onNavigate={onNavigate}>
            구매하기
          </NavLink>
        </aside>
      </section>
    </div>
  );
}

function FridgePage({ planId, onNavigate }: { planId: string; onNavigate: (to: string) => void }) {
  const plan = getPlan(planId);
  const todayRecipe = plan.recipes[0];
  const [message, setMessage] = useState("오늘 먼저 먹을 메뉴를 정해뒀어요.");

  return (
    <div className="page-stack">
      <section className="fridge-hero">
        <p className="eyebrow">구매 후 냉장고 코치</p>
        <h1>오늘 먼저 먹을 재료는 {plan.priorityIngredients.join(", ")}예요.</h1>
        <p>{message}</p>
      </section>
      <section className="coach-card">
        <div>
          <p className="eyebrow">오늘 추천</p>
          <h2>{todayRecipe.name}</h2>
          <p>{todayRecipe.reason}</p>
        </div>
        <div className="coach-stats">
          <Metric label="예상 시간" value={`${todayRecipe.minutes}분`} />
          <Metric label="조리도구" value={todayRecipe.tools.join(", ")} />
          <Metric label="한 끼 단가" value={formatWon(perMealCost(plan.groceryCost, plan.meals))} />
          <Metric label="배달 대비 절약" value={formatWon(todayRecipe.deliverySaving)} />
        </div>
        <div className="action-row">
          <NavLink to={`/cook/${todayRecipe.id}`} className="button primary" onNavigate={onNavigate}>
            요리 시작
          </NavLink>
          <button type="button" className="button secondary" onClick={() => setMessage("오늘은 5분 메뉴로 바꿔볼게요.")}>
            5분 메뉴로 바꾸기
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => setMessage("괜찮아요. 내일은 소비기한이 짧은 재료부터 쓰는 메뉴로 바꿔둘게요.")}
          >
            오늘은 배달 먹었어요
          </button>
          <button type="button" className="button secondary" onClick={() => setMessage("내일 첫 끼로 다시 올려둘게요.")}>
            내일로 미루기
          </button>
        </div>
      </section>
    </div>
  );
}

function CookPage({ recipeId, onNavigate }: { recipeId: string; onNavigate: (to: string) => void }) {
  const { plan, recipe } = useMemo(() => getRecipe(recipeId), [recipeId]);

  return (
    <div className="page-stack">
      <section className="cook-hero">
        <p className="eyebrow">요리 시작</p>
        <h1>{recipe.name}</h1>
        <div className="cook-meta">
          <span>{recipe.minutes}분</span>
          <span>{recipe.tools.join(", ")}</span>
          <span>설거지 적음</span>
        </div>
        <p>오늘 쓰는 재료: {recipe.usedIngredients.join(", ")}</p>
      </section>
      <section className="steps">
        {recipe.steps.map((step, index) => (
          <article className="step" key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </article>
        ))}
      </section>
      <section className="bottom-summary">
        <strong>이 요리를 만들면 식재료 소진율이 {recipe.usageLift}로 올라가요.</strong>
        <p>배달 대비 약 {formatWon(recipe.deliverySaving)}을 아낄 수 있어요.</p>
        <NavLink to={`/fridge?plan=${plan.id}`} className="button secondary" onNavigate={onNavigate}>
          냉장고 코치로 돌아가기
        </NavLink>
      </section>
    </div>
  );
}

export function App() {
  const { route, navigate } = useRoute();

  return (
    <AppShell onNavigate={navigate}>
      {route.name === "home" && <HomePage onNavigate={navigate} />}
      {route.name === "onboarding" && <OnboardingPage onNavigate={navigate} />}
      {route.name === "plans" && <PlansPage onNavigate={navigate} />}
      {route.name === "planDetail" && <PlanDetailPage planId={route.planId} onNavigate={navigate} />}
      {route.name === "cart" && <CartPage planId={route.planId} onNavigate={navigate} />}
      {route.name === "fridge" && <FridgePage planId={route.planId} onNavigate={navigate} />}
      {route.name === "cook" && <CookPage recipeId={route.recipeId} onNavigate={navigate} />}
    </AppShell>
  );
}
