import {
	Calendar,
	Home,
	Inbox,
	LogOut,
	Search,
	Settings,
	User,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetProfile } from "@/features/authentication/hooks/use-get-profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
];

export function AppSidebar() {
	const { data: profile } = useGetProfile();

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="p-4">
					<Logo />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Features</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="flex items-center gap-2 w-full justify-start p-2"
						>
							<Avatar>
								<AvatarImage src={profile?.user.avatar ?? ""} />
								<AvatarFallback>
									{profile?.user.name.split(" ")[0].charAt(0)}
								</AvatarFallback>
							</Avatar>

							<div className="flex flex-col items-start">
								<p className="text-sm font-medium text-left">
									{profile?.user.name}
								</p>
								<span className="text-xs text-muted-foreground">
									{profile?.user.email}
								</span>
							</div>
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-56">
						<DropdownMenuItem>
							<LogOut className="w-4 h-4 mr-2" />
							<span>Sair</span>
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<User className="w-4 h-4 mr-2" />
							<span>Perfil</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
