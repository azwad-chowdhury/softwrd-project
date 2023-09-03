<script>
	import { countryDataStore } from '../../stores/countryDataStore';

	var countries = [];
	countryDataStore.subscribe((value) => {
		countries = value;
	});
</script>

<h1>Chart Page</h1>
