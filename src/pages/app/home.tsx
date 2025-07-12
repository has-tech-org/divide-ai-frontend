import { TrendingUp } from "lucide-react";
import { ChartAreaInteractive } from "@/components/home-chart";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Home = () => {
	return (
		<div className="h-full space-y-4">
			<div className="flex items-center gap-4 p-4 border-b border-zinc-800">
				<SidebarTrigger />

				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/components">Components</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">Total Revenue</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">$1,250.00</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>Visitors for the last 6 months</CardDescription>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">Total Revenue</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">$1,250.00</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>Visitors for the last 6 months</CardDescription>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">Total Revenue</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">$1,250.00</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>Visitors for the last 6 months</CardDescription>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">Total Revenue</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">$1,250.00</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>Visitors for the last 6 months</CardDescription>
					</CardFooter>
				</Card>
			</div>

			<ChartAreaInteractive />
		</div>
	);
};
