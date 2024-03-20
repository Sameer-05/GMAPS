import Search from '@arcgis/core/widgets/Search';
import SearchSource from '@arcgis/core/widgets/Search/SearchSource';
import esriRequest from '@arcgis/core/request';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";

let url = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

function SearchWidget(View) {
    // Create search1 instance
    const search1 = new Search({ view: View });

    // Add search1 widget to the UI
    View.ui.add(search1, 'top-right');
    const search2 = new Search({ view: View });

    // Add search1 widget to the UI
    View.ui.add(search2, 'top-right');
    const search3 = new Search({ view: View });

    // Add search1 widget to the UI
    View.ui.add(search3, 'top-right');

    // Event listener for select-result event on search1
    search1.on("select-result", (event) => {
    //    

        // Clear existing sources in search2
        search2.sources = [];

        // Create a custom search source for search2 based on the selected address from search1
        const customSearchSource = new SearchSource({
            placeholder: "Search here...",
            // Provide a getSuggestions method to provide suggestions to the Search widget
            getSuggestions: (params) => {
                // Request data from a third-party source to find some suggestions with provided searchTerm
                return esriRequest(url + "/search", {
                    query: {
                        text: event.result.feature.name,
                        limit: 4,
                        lat: event.result.feature.geometry.y, // Use the latitude of the selected address
                        lon: event.result.feature.geometry.x // Use the longitude of the selected address
                    },
                    responseType: "json"
                }).then((results) => {
                    // Return suggestion results to display in the Search widget
                    return results.data.suggestions.map((suggestion) => {
                        return {
                            key: suggestion.magicKey,
                            text: suggestion.text,
                            sourceIndex: 0 // Source index for custom search source
                        };
                    });
                });
            },
            // Provide a getResults method to find results from the suggestions
            getResults: (params) => {
                // If the Search widget passes the current location, you can use this in your own custom source
                const operation = params.location ? "reverse/" : "search/";
                let query = {};
                // You can perform a different query if a location is provided
                if (params.location) {
                    query.lat = params.location.latitude;
                    query.lon = params.location.longitude;
                } else {
                    query.q = params.suggestResult.text.replace(/ /g, "+");
                    query.limit = 6;
                    query.countryCode = "IND"; // Set country code here
                }
                return esriRequest(url + operation, {
                    query: query,
                    responseType: "json"
                }).then((results) => {
                    // Parse the results of your custom search
                    const searchResults = results.data.features.map((feature) => {
                        // Create a Graphic the Search widget can display
                        const graphic = new Graphic({
                            geometry: new Point({
                                x: feature.geometry.coordinates[0],
                                y: feature.geometry.coordinates[1]
                            }),
                            attributes: feature.properties
                        });
                        // Optionally, you can provide an extent for a point result, so the view can zoom to it
                        const buffer = geometryEngine.geodesicBuffer(graphic.geometry, 100, "meters");
                        // Return a Search Result
                        const searchResult = {
                            extent: buffer.extent,
                            feature: graphic,
                            name: feature.properties.label
                        };
                        return searchResult;
                    });

                    // Return an array of Search Results
                    return searchResults;
                });
            }
        });

        // Add the custom search source to search2
        search2.sources.push(customSearchSource);

       
    });
    search2.on("select-result", (event) => {
    //    

        // Clear existing sources in search2
        search3.sources = [];

        // Create a custom search source for search2 based on the selected address from search1
        const customSearchSource = new SearchSource({
            placeholder: "Search here...",
            // Provide a getSuggestions method to provide suggestions to the Search widget
            getSuggestions: (params) => {
                // Request data from a third-party source to find some suggestions with provided searchTerm
                return esriRequest(url + "/search", {
                    query: {
                        text: event.result.feature.name,
                        limit: 4,
                        lat: event.result.feature.geometry.y, // Use the latitude of the selected address
                        lon: event.result.feature.geometry.x // Use the longitude of the selected address
                    },
                    responseType: "json"
                }).then((results) => {
                    // Return suggestion results to display in the Search widget
                    return results.data.suggestions.map((suggestion) => {
                        return {
                            key: suggestion.magicKey,
                            text: suggestion.text,
                            sourceIndex: 0 // Source index for custom search source
                        };
                    });
                });
            },
            // Provide a getResults method to find results from the suggestions
            getResults: (params) => {
                // If the Search widget passes the current location, you can use this in your own custom source
                const operation = params.location ? "reverse/" : "search/";
                let query = {};
                // You can perform a different query if a location is provided
                if (params.location) {
                    query.lat = params.location.latitude;
                    query.lon = params.location.longitude;
                } else {
                    query.q = params.suggestResult.text.replace(/ /g, "+");
                    query.limit = 6;
                    query.countryCode = "IND"; // Set country code here
                }
                return esriRequest(url + operation, {
                    query: query,
                    responseType: "json"
                }).then((results) => {
                    // Parse the results of your custom search
                    const searchResults = results.data.features.map((feature) => {
                        // Create a Graphic the Search widget can display
                        const graphic = new Graphic({
                            geometry: new Point({
                                x: feature.geometry.coordinates[0],
                                y: feature.geometry.coordinates[1]
                            }),
                            attributes: feature.properties
                        });
                        // Optionally, you can provide an extent for a point result, so the view can zoom to it
                        const buffer = geometryEngine.geodesicBuffer(graphic.geometry, 100, "meters");
                        // Return a Search Result
                        const searchResult = {
                            extent: buffer.extent,
                            feature: graphic,
                            name: feature.properties.label
                        };
                        return searchResult;
                    });

                    // Return an array of Search Results
                    return searchResults;
                });
            }
        });

        // Add the custom search source to search2
        search3.sources.push(customSearchSource);

       
    });
}

export default SearchWidget;
