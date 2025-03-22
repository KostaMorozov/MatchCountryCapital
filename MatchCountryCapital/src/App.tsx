import { useEffect, useState, Suspense, useCallback } from "react";
import { countriesObj } from "./config/config.ts";
import Button from "./common/Button.tsx";
import { Shuffle } from "./utils/utils.ts";

function App() {
  const [countries, setCountries] = useState<string[]>([]);
  const [capitals, setCapitals] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);

  const initiateButtonsLabel = () => {
    const countries: string[] = [];
    const capitals: string[] = [];
    Object.entries(countriesObj).forEach(([country, capital]) => {
      countries.push(country);
      capitals.push(capital);
    });
    setCountries(Shuffle(countries));
    setCapitals(Shuffle(capitals));
  };

  useEffect(() => {
    initiateButtonsLabel();
  }, []);

  const checkIsValidPair = (currentGuess: string[]): boolean => {
    let isValid = false;
    Object.entries(countriesObj).forEach(([country, capital]) => {
      if (currentGuess.includes(country) && currentGuess.includes(capital)) {
        isValid = true;
      }
    });
    return isValid;
  };

  const isArrayContainsEmptyValues = (arr: string[]) => {
    return arr.some((item) => !item);
  };

  const handleGuess = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    let guessArr = [...currentGuess];
    if (
      currentGuess.length === 2 &&
      !isArrayContainsEmptyValues(currentGuess)
    ) {
      guessArr = [];
    }
    if (target.id) {
      guessArr.push(target.id);
    } else {
      return;
    }
    setCurrentGuess(guessArr);
  };

  const removePair = useCallback(
    (currentGuess: string[]) => {
      const isCapital = capitals.includes(currentGuess[0]);
      const guess = isCapital
        ? [currentGuess[1], currentGuess[0]]
        : currentGuess;
      const filteredCountries = countries.filter(
        (country) => country !== guess[0]
      );
      const filteredCapitals = capitals.filter(
        (capital) => capital !== guess[1]
      );
      setCountries(filteredCountries);
      setCapitals(filteredCapitals);
    },
    [countries, capitals]
  );

  useEffect(() => {
    let isValidPair = false;
    if (currentGuess.length === 2) {
      isValidPair = checkIsValidPair(currentGuess);
    }
    if (isValidPair) {
      removePair(currentGuess);
    }
  }, [currentGuess]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="buttonsWrapper" onClick={handleGuess}>
        <div>
          <h2>Countries</h2>
          <div className="contentWrapper">
            {countries.map((country) => (
              <Button
                key={country}
                label={country}
                isChecked={currentGuess.includes(country)}
                isError={
                  currentGuess.length === 2 &&
                  !isArrayContainsEmptyValues(currentGuess)
                }
              />
            ))}
          </div>
        </div>
        <div>
          <h2>Capitals</h2>
          <div className="contentWrapper">
            {capitals.map((capital) => (
              <Button
                key={capital}
                label={capital}
                isChecked={currentGuess.includes(capital)}
                isError={
                  currentGuess.length === 2 &&
                  !isArrayContainsEmptyValues(currentGuess)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
