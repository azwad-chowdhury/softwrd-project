<script>
	import { onMount } from 'svelte';
	import 'ol/ol.css';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import VectorLayer from 'ol/layer/Vector';
	import VectorSource from 'ol/source/Vector';
	import GeoJSON from 'ol/format/GeoJSON';
	import { Style, Fill } from 'ol/style';

	let map;

	onMount(() => {
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			})
		});

		const geojsonLayer = new VectorLayer({
			source: new VectorSource({
				url: 'src/data/countries.geojson.json',
				format: new GeoJSON()
			}),
			style: new Style({
				fill: new Fill({
					color: 'rgba(0, 106, 78, 0.75)'
				})
			})
		});

		map.addLayer(geojsonLayer);
	});
</script>

<div id="map" class="w-full h-screen" />
