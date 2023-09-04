<script>
	// @ts-nocheck

	import { countryDataStore } from '../../stores/countryDataStore';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let currentPage = 1;
	const countriesPerPage = 10;
	let updatedCountries = [];
	let countries = [];
	let countriesForSort = [];
	let mostPopulatedCountries = [];

	countryDataStore.subscribe((value) => {
		countries = value;
		countriesForSort = [...value]; //making a copy for original value
		mostPopulatedCountries = countriesForSort
			.sort((a, b) => b.population - a.population)
			.slice(0, 10);
		updateupdateCountries();
	});

	onMount(() => {
		updateupdateCountries();
		createPolarChart();
	});

	// updating countries on each time indexing
	function updateupdateCountries() {
		const startIndex = (currentPage - 1) * countriesPerPage;
		const endIndex = startIndex + countriesPerPage;
		updatedCountries = countries.slice(startIndex, endIndex);
	}

	// pagination functions
	function nextPage() {
		if (currentPage < Math.ceil(countries.length / countriesPerPage)) {
			currentPage += 1;
			updateupdateCountries();
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
			updateupdateCountries();
		}
	}

	// polar area function
	function createPolarChart() {
		if (mostPopulatedCountries.length === 0) {
			return;
		}

		const labels = mostPopulatedCountries.map((country) => country.name.common);
		const data = mostPopulatedCountries.map((country) => country.population);
		const ctx = document.getElementById('polarAreaChart').getContext('2d');

		new Chart(ctx, {
			type: 'polarArea',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)'
						]
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				title: {
					display: true,
					text: 'Top 10 Most Populated Countries'
				}
			}
		});
	}
</script>

<main class="min-h-screen" style="background-color: rgba(0,0,0,0.03);">
	<div class="grid grid-cols-12 p-5">
		<div class="xl:col-span-6 col-span-12">
			<div class="table overflow-x-auto grid">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="header">
						<tr>
							<th class="w-1/12 p-3">Flag</th>
							<th class="w-1/12">Name</th>
							<th class="w-1/12">Population</th>
							<th class="w-1/12">CIOC</th>
							<th class="w-1/12">UN Member Status</th>
							<th class="w-1/12">Currencies</th>
							<th class="w-1/12">Languages</th>
						</tr>
					</thead>
					<tbody class="body">
						{#each updatedCountries as country}
							<tr>
								<td class="w-1/12">
									<div style="display: flex;justify-content:center;padding:5px">
										<img
											src={country.flags.png}
											alt=""
											style="height: 30px;width :50px;border-radius:5px"
										/>
									</div>
								</td>

								<td class="w-1/12 text-center">{country.name.common}</td>
								<td class="w-1/12 text-center">{country.population}</td>
								<td class="w-1/12 text-center">{country.cioc}</td>
								<td class="w-1/12 text-center">
									<div style="display: flex;justify-content:center;padding:5px">
										<div class="member-tag {country.unMember == true ? 'yes' : 'no'}">
											{country.unMember ? 'Yes' : 'No'}
										</div>
									</div>
								</td>
								<td class="w-1/12 text-center">
									{#if country.currencies}
										{#each Object.keys(country.currencies) as currencyKey, i}
											{country.currencies[currencyKey].symbol}{i !==
											Object.keys(country.currencies).length - 1
												? ', '
												: ''}
										{/each}
									{:else}
										N/A
									{/if}
								</td>
								<td class="w-1/12 text-center">
									{#if country.languages}
										{#each Object.keys(country.languages) as languageCode, i}
											{country.languages[languageCode]}{i !==
											Object.keys(country.languages).length - 1
												? ', '
												: ''}
										{/each}
									{:else}
										N/A
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="pagination" style="padding: 15px ;">
				<button on:click={prevPage} disabled={currentPage === 1} class="pagination-button"
					>Previous</button
				>
				<span>Page {currentPage}</span>
				<button
					on:click={nextPage}
					disabled={currentPage === Math.ceil(countries.length / countriesPerPage)}
					class="pagination-button">Next</button
				>
			</div>
		</div>

		<div class="xl:col-span-5 col-span-12 xl:ml-4 ml:0 xl:mt-0 mt-4">
			<div
				class="chart-div"
				style="padding:15px;border:1px solid rgba(0,0,0,0.1);border-radius:15px"
			>
				<div class="heading" style="border-bottom: 1px solid rgba(0,0,0,0.1)">
					<h1 style="font-size: 24px;font-weight:600">Countries</h1>
				</div>

				<div class="chart-container">
					<canvas id="polarAreaChart" width="400" height="400" />
				</div>
			</div>
		</div>
	</div>
</main>
