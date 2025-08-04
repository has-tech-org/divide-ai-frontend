import { ChevronsUpDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { useNavigate, useParams } from "react-router";
import { Logo } from "@/components/navbar-components/logo";
import NotificationMenu from "@/components/navbar-components/notification-menu";
import UserMenu from "@/components/navbar-components/user-menu";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { useGetProfile } from "@/features/authentication/hooks/use-get-profile";
import { useFetchAvailableCards } from "@/features/cards/hooks/use-fetch-available-cards";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Params = {
	cardSlug: string;
};

export function Header() {
	const { data: profile } = useGetProfile();
	const { data: availableCards } = useFetchAvailableCards();

	const hasCards = !!availableCards && availableCards?.length > 0;

	const navigate = useNavigate();
	const { cardSlug } = useParams<Params>();

	const handleChangeCard = (value: string) => {
		navigate(`/app/${value}/overview`);
	};

	return (
		<header className="px-4 md:px-6">
			<div className="flex h-16 items-center justify-between gap-4">
				{/* Left side */}
				<div className="flex items-center gap-2">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/app" className="text-foreground">
									<Logo />
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="text-gray-700">
								{" "}
								/{" "}
							</BreadcrumbSeparator>
							<BreadcrumbItem className="md:hidden">
								<DropdownMenu>
									<DropdownMenuTrigger className="hover:text-foreground">
										<BreadcrumbEllipsis />
										<span className="sr-only">Toggle menu</span>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										<DropdownMenuItem>
											<Avatar>
												<AvatarImage src={profile?.user?.avatar ?? ""} />
												<AvatarFallback>
													{profile?.user?.name.slice(0, 2).toUpperCase()}
												</AvatarFallback>
											</Avatar>

											<span className="text-sm font-medium text-gray-200">
												{profile?.user?.name}
											</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</BreadcrumbItem>
							<BreadcrumbItem className="max-md:hidden">
								<Avatar>
									<AvatarImage src={profile?.user?.avatar ?? ""} />
									<AvatarFallback>
										{profile?.user?.name.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>

								<span className="text-sm font-medium text-gray-200">
									{profile?.user?.name.split(" ").slice(0, 2).join(" ")}
								</span>
							</BreadcrumbItem>

							{hasCards && (
								<>
									<BreadcrumbSeparator className="text-gray-700">
										{" "}
										/{" "}
									</BreadcrumbSeparator>
									<BreadcrumbItem>
										<Select value={cardSlug} onValueChange={handleChangeCard}>
											<SelectPrimitive.SelectTrigger
												aria-label="Select project"
												className="flex items-center gap-1"
											>
												<SelectValue placeholder="Selecione um cartão" />
												<ChevronsUpDown
													size={14}
													className="text-muted-foreground/80"
												/>
											</SelectPrimitive.SelectTrigger>
											<SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
												{availableCards?.map((card) => (
													<SelectItem key={card.slug} value={card.slug}>
														{card.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</BreadcrumbItem>
								</>
							)}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{/* Right side */}
				<div className="flex items-center gap-4">
					{/* Notification */}
					<NotificationMenu />
					{/* User menu */}
					<UserMenu
						name={profile?.user?.name ?? ""}
						email={profile?.user?.email ?? ""}
						avatar={profile?.user?.avatar ?? ""}
					/>
				</div>
			</div>
		</header>
	);
}
