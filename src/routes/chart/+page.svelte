<script>
	// @ts-nocheck

	import { countryDataStore } from '../../stores/countryDataStore';
	import { onMount } from 'svelte';

	let currentPage = 1;
	const countriesPerPage = 10;
	let updatedCountries = [];
	let countries = [];

	countryDataStore.subscribe((value) => {
		countries = value;
		updateupdateCountries();
	});

	onMount(() => {
		updateupdateCountries();
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
		</div>
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
</main>
