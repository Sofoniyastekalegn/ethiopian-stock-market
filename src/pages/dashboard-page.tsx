import OverviewCard from "@/components/overview-card";

import ThemeToggle from "@/components/theme-toggle";
import StocksListTable from "@/components/stocks-list-table";

import { stocks } from "@/assets/data/stocks";
import { Link } from "react-router-dom";

const overStocks = stocks.filter((stock) => stock.category === "overview");

const Dashboard = () => {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex justify-between items-center gap-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Markets</h1>
        <span className="text-muted-foreground">
          <ThemeToggle />
        </span>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Quick Overview of the Market
        </h3>
        <div className="flex md:grid gap-2 md:gap-4 grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 overflow-auto hide-scroll -mx-3 md:mx-0 px-3 md:px-0">
          {overStocks.map((overview) => (
            <Link key={overview.symbol} to={`/stock/${overview.symbol}`}>
              <OverviewCard
                title={overview.name}
                currentPrice={overview.currentPrice}
                percentageChange={overview.percentageChange}
                trend={overview.trend}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 mb-8 md:mt-16 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Recently Treading Stocks</h3>
        <StocksListTable stocks={stocks} />
      </section>
    </div>
  );
};

export default Dashboard;
