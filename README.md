# Currency Converter App 🌍💱

This is a **modern, responsive, and user-friendly currency converter application** built using **Next.js**, **React**, and **Tailwind CSS**. The app allows users to convert currencies in real-time, leveraging live exchange rate data.

## Features ✨

-   **Real-Time Conversion**: Automatically updates the converted value as you type or select different currencies.
-   **Customizable Interface**: Beautiful, gradient-enhanced design with smooth animations.
-   **Responsive Design**: Works seamlessly on all devices, from desktops to smartphones.
-   **Optimized Performance**: Utilizes server-side data fetching and caching for efficiency.
-   **Accessibility**: Includes keyboard and screen reader support for inclusive user experience.

---

## Tech Stack 🛠️

-   **Framework**: [Next.js](https://nextjs.org/) (v15.0.3)
-   **Frontend**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **API Requests**: [Axios](https://axios-http.com/)
-   **Live Exchange Rates**: Powered by a mock API for demonstration purposes.

---

## Installation 🚀

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/IamOlegDub/currency-converter
    cd currency-converter
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the Application**:

    ```bash
    npm run dev
    ```

4. **Visit the App**:
   Open your browser and navigate to `https://currency-converter-nine-jet.vercel.app/`.

---

## Usage 🧑‍💻

1. **Select Currencies**:

    - Choose the base currency (e.g., USD).
    - Select the target currency (e.g., EUR).

2. **Enter Amount**:

    - Input the amount to be converted.

3. **Automatic Updates**:
    - The converted amount is calculated and displayed in real-time.

---

## File Structure 🗂️

```
├── components/
│   ├── Converter.tsx         # Main currency converter component
│   ├── Header.tsx            # Header with app title and live rates
│   ├── HeaderDeco.tsx        # Decorative cycles for header styling
│   ├── RateBlock.tsx         # Styled block for exchange rates
│   ├── TheInput.tsx          # Custom input component for entering amounts
│   ├── TheSelect.tsx         # Custom dropdown/select component for currency selection
│   ├── SkeletonRateBlock.tsx # Loading skeleton for rates displayed while fetching
├── app/
│   ├── page.tsx              # Home page rendering the app's main components
│   ├── globals.css           # Global CSS styles for the entire app
│   ├── layout.tsx            # Root layout for app-wide structure and metadata
│   ├── favicon.ico           # Favicon for the application
├── hooks/
│   ├── useExchangeRates.ts   # Custom hook for fetching and managing exchange rates
│   ├── useOutsideClick.ts    # Hook to handle clicks outside an element (e.g., dropdown)
├── public/
│   ├── logo.png              # Logo image used in the app header
├── utils/
│    ├── api/
│       ├── api.ts            # API logic for fetching exchange rates from external services
│    ├── shared/
│       ├── constants.ts      # Shared constants for currencies and other configurations
│       ├── types.ts          # Shared TypeScript types and interfaces for the app
├── tailwind.config.ts        # Tailwind CSS configuration file for theming and customization
├── next.config.js            # Next.js configuration for app-level settings
├── package.json              # Dependencies and scripts for the project

```

---

## Features in Detail 📖

### Header

-   Displays the application logo and title.
-   Shows live exchange rates for **USD** and **EUR** against **UAH**.

### Converter

-   Two customizable input fields to enter amounts.
-   Custom dropdown menus to select currencies with animations and intuitive UX.
-   Automatic recalculations based on the last edited input field and selected currencies.

---

### Developed By:

-   **[Oleg Dub](http://olegdub.web.app/)**

Enjoy converting currencies effortlessly! 🎉

# currency-converter
