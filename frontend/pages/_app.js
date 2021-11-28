import "../styles/globals.scss"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { themeChange } from "theme-change"


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WalletCheck({ Component, pageProps }) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		themeChange(false)
			// run auth check on initial load
			checkForAuthentication(router.asPath);

			// set authorized to false to hide page content while changing routes
			const hideContent = () => setAuthorized(false);
			router.events.on('routeChangeStart', hideContent);

			// run auth check on route change
			router.events.on('routeChangeComplete', checkForAuthentication)

			// unsubscribe from events in useEffect return function
			return () => {
					router.events.off('routeChangeStart', hideContent);
					router.events.off('routeChangeComplete', checkForAuthentication);
			}
	}, []);

	function checkForAuthentication(url) {
		// redirect to login page if accessing a private page and not logged in 
		const publicallyAcessiblePaths = ['/login','/recovery','/register'];
		const path = url.split('?')[0];
		const token =  sessionStorage.getItem("auth_token")
		if ( !publicallyAcessiblePaths.includes(path)  && !token) {
				setAuthorized(false);
				router.push({
						pathname: '/login'
				});
		} 
		else if (publicallyAcessiblePaths.includes(path) && token){
				router.push({
					pathname: '/'
			});
		} 
		else {
				setAuthorized(true);
		}
}

	return <><ToastContainer position="bottom-right"
	autoClose={5000}
	hideProgressBar={false}
	newestOnTop={false}
	closeOnClick
	rtl={false}
	pauseOnFocusLoss
	draggable
	pauseOnHover/> {authorized &&
		<Component {...pageProps} />
}</>
}

export default WalletCheck
