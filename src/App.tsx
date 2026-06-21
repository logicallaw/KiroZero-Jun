import { useEffect, useMemo, useState } from "react";
import { defaultPlanId, getPlan, getRecipe, ingredientPlans, type IngredientPlan } from "./data/ingredientPlans";
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
      <div className="card-metrics">
        <Metric label="예상 장보기" value={formatWon(plan.groceryCost)} />
        <Metric label="배달 대비 절약" value={formatWon(plan.deliverySaving)} />
        <Metric label="한 끼 단가" value={formatWon(perMealCost(plan.groceryCost, plan.meals))} />
        <Metric label="소진율" value={`${plan.freshFoodUsageRate}%`} />
      </div>
      <div className="recipe-preview">
        <span>만들 수 있는 것</span>
        <ul>
          {plan.recipes.slice(0, 3).map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      </div>
      <NavLink to={`/plans/${plan.id}`} className="button primary full" onNavigate={onNavigate}>
        {plan.ctaLabel}
      </NavLink>
    </article>
  );
}

function HomePage({ onNavigate }: { onNavigate: (to: string) => void }) {
  const featured = ingredientPlans[0];

  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">이번 주 목표</p>
          <h1>배달 2번 줄이면 약 24,000원을 아낄 수 있어요.</h1>
          <p>
            {featured.ingredientName} 플랜으로 장보기 한 번에 {featured.headline}할 수 있게 먹는 순서까지
            잡아드려요.
          </p>
          <div className="hero-actions">
            <NavLink to="/onboarding" className="button primary" onNavigate={onNavigate}>
              빠른 추천 받기
            </NavLink>
            <NavLink to="/plans" className="button secondary" onNavigate={onNavigate}>
              플랜 먼저 보기
            </NavLink>
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-top">
            <span>추천 플랜</span>
            <strong>{featured.ingredientName}</strong>
          </div>
          <SavingSummary plan={featured} />
          <div className="today-line">
            <span>오늘 먼저 먹을 재료</span>
            <strong>{featured.priorityIngredients.join(", ")}</strong>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">핵심 재료 플랜</p>
          <h2>레시피보다 먼저, 이번 주 버티는 재료를 고르세요.</h2>
        </div>
        <div className="plan-grid">
          {ingredientPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
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
          <p className="eyebrow">재료 플랜 상세</p>
          <h1>{plan.ingredientName} 플랜</h1>
          <p>이 장보기로 {plan.days}일 동안 {plan.meals}끼를 해결해요.</p>
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
          <p className="eyebrow">먹는 순서</p>
          <h2>무엇부터 먹을지 먼저 정해둘게요.</h2>
        </div>
        <div className="timeline">
          {plan.recipes.map((recipe) => (
            <article className="timeline-item" key={recipe.id}>
              <span>{recipe.dayLabel}</span>
              <div>
                <h3>{recipe.name}</h3>
                <p>{recipe.reason}</p>
              </div>
              <strong>{recipe.minutes}분</strong>
            </article>
          ))}
        </div>
        <p className="coach-note">{plan.coachNote}</p>
        <NavLink to={`/cart?plan=${plan.id}`} className="button primary" onNavigate={onNavigate}>
          장바구니 만들기
        </NavLink>
      </section>
    </div>
  );
}

function CartPage({ planId, onNavigate }: { planId: string; onNavigate: (to: string) => void }) {
  const plan = getPlan(planId);
  const total = plan.cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-stack">
      <section className="section-heading">
        <p className="eyebrow">자동 장바구니</p>
        <h1>{plan.ingredientName} 플랜 장바구니</h1>
        <p>1인 가구 기준으로 {plan.days}일 안에 대부분 소진되도록 구성했어요.</p>
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
            구매했다고 보기
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
