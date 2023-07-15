import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { ChevronLeftCircleIcon, Loader2 } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import TrendChip from "@/components/trend-chip";
import DetailedChart from "@/components/chart/detailed";
import ProgressWithLabel from "@/components/progress-with-label";
import PercentageIndicator from "@/components/percentage-indicator";
import { Button } from "@/components/ui/button";

import { formateAmount } from "@/utils/index";
import { stocks } from "@/assets/data/stocks";

const getStockDetails = (symbol: string) => {
  const stock = stocks.find((stock) => stock.symbol?.toLowerCase() === symbol?.toLowerCase());

  if (!stock) return;

  return stock;
};

const data = [
  {
    id: "close-price",
    label: "close price",
    value: 25_332,
  },
  {
    id: "last-trade-price",
    label: "last trade price",
    value: 25_373,
  },
  {
    id: "outstanding",
    label: "outstanding",
    value: 856_924_860,
  },
  {
    id: "market-value",
    label: "market value",
    value: 489_856_924_860,
  },
];

const StockDetailsPage = () => {
  const params = useParams();
  const stock = getStockDetails(params.symbol as string);

  if (!stock) {
    // TODO: add a 404 page
    return "404";
  }

  return (
    <div className="container mx-auto pt-4">
      <section className="flex justify-between items-center gap-2 mb-8">
        <div className="flex gap-2 items-center">
          <Link to={"/"} className="block lg:hidden">
            <ChevronLeftCircleIcon className="opacity-50 w-9 h-9" />
          </Link>
          <header className="leading-none">
            <h1 className="text-lg font-semibold tracking-tight">{stock.symbol}</h1>
            <span className="block text-muted-foreground capitalize">{stock.fullName}</span>
          </header>
        </div>

        <span className="text-muted-foreground">
          <ThemeToggle />
        </span>
      </section>

      <section className="space-y-2">
        <h3 className="text-3xl font-semibold">{formateAmount(stock.currentPrice)}</h3>
        <TrendChip
          className="inline-block"
          percentageChange={stock.percentageChange}
          trend={stock.trend}
        />
      </section>

      <DetailedChart chartData={stock.chartData} trend={stock.trend} />

      <section className="mt-8">
        <h3 className="capitalize text-muted-foreground font-semibold text-sm md:text-base mb-2">
          overview
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex md:flex-col items-center md:items-start justify-between capitalize"
            >
              <span className="text-sm">{item.label}</span>
              <span className="text-lg font-semibold">{formateAmount(item.value)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h3 className="capitalize text-muted-foreground font-semibold text-sm md:text-base block mb-4">
          analyst estimates
        </h3>

        <div className="flex gap-4 items-center">
          <PercentageIndicator percentage={stock.percentageChange} trend={stock.trend} />

          <div className="flex flex-col gap-2 w-full">
            <ProgressWithLabel
              label="buy"
              percentage={stock.trend === "up" ? 62 : 21}
              type={stock.trend === "up" ? "green" : "red"}
            />
            <ProgressWithLabel label="hold" percentage={4} />
            <ProgressWithLabel label="sell" percentage={15} />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h3 className="capitalize text-muted-foreground font-semibold text-sm md:text-base block mb-2">
          about {stock.fullName}
        </h3>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias id, rem et consectetur
          dignissimos non expedita quo in repellat fugiat, excepturi doloribus asperiores deserunt
          est qui sit fuga nobis perspiciatis, exercitationem quaerat! Ea sequi accusamus veniam
          nostrum ex odit tenetur. Nisi ea quidem asperiores natus provident eaque consectetur modi
          quas!
        </p>
      </section>

      <AddStockBtn stockName={stock.fullName} />
    </div>
  );
};

import { useToast } from "@/components/ui/use-toast";

export type AddStockBtnProps = {
  stockName: string;
};

const AddStockBtn = ({ stockName }: AddStockBtnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStockAdd = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "New Stock Added to Portfolio",
        description: `${stockName} has been added to your portfolio`,
      });
    }, 1000);
  };

  return (
    <div className="flex justify-center">
      <Button className="mt-8" onClick={handleStockAdd} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add to Portfolio
      </Button>
    </div>
  );
};

export default StockDetailsPage;
