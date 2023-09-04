<script>
	import '../app.css';

	import { initializeApp } from 'firebase/app';
	const firebaseConfig = {
		apiKey: 'AIzaSyA8UIUy-ixw1NTprzLAUODcbarcUfFd9OE',
		authDomain: 'softwrd-project.firebaseapp.com',
		projectId: 'softwrd-project',
		storageBucket: 'softwrd-project.appspot.com',
		messagingSenderId: '756197563651',
		appId: '1:756197563651:web:d6c55b0482ebabb9185d36'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
</script>

<!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->

<slot />
