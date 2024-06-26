import AuthHeader from "./AuthHeader";
import AuthLeftBar from "./AuthSideBar";
// import AuthFooter from "./AuthFooter";


function AuthLayout({children}) {

	return (
		<div className='h-full md:grid grid-cols-2 bg-[#FEE2CD]'>
			<AuthLeftBar />

			<div className=" bg-white dark:bg-dark py-20 px-4">
				<div className="  max-w-[500px] mx-auto">
					<AuthHeader />
					<div className="">{children}</div>

				</div>
			
			</div>

		</div>
	);
}

export default AuthLayout;
