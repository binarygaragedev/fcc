# Flight Carbon Calculator

The Flight Carbon Calculator is a web application that allows users to calculate the carbon footprint of their flights. Users can select the origin and destination airports, specify the number of passengers, choose the cabin class, and select the aircraft type to get an estimate of the CO2 emissions for their flight.

## Features

- User-friendly interface for selecting flight details
- Dropdown menus for selecting origin and destination airports
- Input field for specifying the number of passengers
- Button group for selecting the cabin class (Economy, Business, First)
- Dropdown menu for selecting the aircraft type
- Calculation of CO2 emissions based on flight distance, cabin class, and aircraft type
- Display of results, including per-person and total CO2 emissions
- Color-coded emission levels (green, yellow, red) based on the total CO2 emissions
- Comparison of CO2 emissions to equivalent car travel distance

## Technologies Used

- React: JavaScript library for building user interfaces
- Tailwind CSS: Utility-first CSS framework for styling the application
- Lucide Icons: Beautiful, pixel-perfect icons
- JSON: Data format for storing airport and aircraft information

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/flight-carbon-calculator.git
   ```

2. Install the dependencies:

   ```bash
   cd flight-carbon-calculator
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open the application in your web browser at `http://localhost:3000`.

## Project Structure

The project consists of the following files:

- `src/CarbonCalculator.js`: The main React component that renders the flight carbon calculator form and results.
- `src/airports.json`: JSON file containing airport data, including airport names, cities, countries, IATA codes, and coordinates.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `package.json`: File containing project dependencies and scripts.
- `README.md`: Documentation file providing an overview of the project.

## Customization

- Airport Data: You can modify the `airports.json` file to add, remove, or update airport information according to your requirements.
- Aircraft Types: The `aircraftTypes` array in the `CarbonCalculator` component contains a list of aircraft types along with their relative emission factors. You can expand or adjust this list based on your needs.
- Emission Levels: The `getEmissionLevel` function in the `CarbonCalculator` component defines the thresholds for categorizing emissions into green, yellow, and red levels. Feel free to adjust these thresholds to match your desired criteria.
- Styling: The application uses Tailwind CSS utility classes for styling. You can customize the appearance by modifying the class names in the component or by adding custom CSS styles.

## Data Sources

- Airport data: The `airports.json` file contains a list of airports with their IATA codes, cities, countries, and coordinates. You can expand or modify this list as needed.
- Aircraft data: The `aircraftTypes` array in the `CarbonCalculator` component contains a list of aircraft types with their relative emission factors. These factors are based on approximate values and may not reflect the exact emissions of specific aircraft variants or configurations.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Acknowledgements

- [International Civil Aviation Organization (ICAO)](https://www.icao.int/) for providing data on global average CO2 emissions per passenger-kilometer.
- [OpenFlights](https://openflights.org/data.html) for providing airport data.
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Lucide](https://lucide.dev/) for the open-source icon library.

## Contact

For any inquiries or questions, please contact [contact@binarygarage.dev](mailto:contact@binarygarage.dev).
