import { useRef, useState } from "react";
import "./App.css";
import { Card, CardId } from "./components/card";
import { useButton } from "react-aria";

const cardIds: CardId[] = [
  "CHUNKY",
  "TEA",
  "CREEPE",
  "CINEMA",
  "BAG",
  "BATH",
  "CONSTRUCTION",
  "SUPERHERO",
  "FLOWERS",
  "TYPING",
  "PLANE",
  "CAKE",
];

function App() {
  const [currentId, setCurrentId] = useState<CardId>(cardIds[0]);
  const leftButtonRef = useRef<HTMLDivElement | null>(null);
  const rightButtonRef = useRef<HTMLDivElement | null>(null);

  const { buttonProps: leftButtonProps } = useButton(
    {
      elementType: "div",
      onPress: () => {
        const currentIndex = cardIds.indexOf(currentId);
        const nextIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        setCurrentId(cardIds[nextIndex]);
      },
    },
    leftButtonRef
  );

  const { buttonProps: rightButtonProps } = useButton(
    {
      elementType: "div",
      onPress: () => {
        const currentIndex = cardIds.indexOf(currentId);
        const nextIndex =
          currentIndex === cardIds.length - 1
            ? cardIds.length - 1
            : currentIndex + 1;
        setCurrentId(cardIds[nextIndex]);
      },
    },
    rightButtonRef
  );

  return (
    <main>
      <div
        ref={leftButtonRef}
        className="fakeLeftButton"
        {...leftButtonProps}
      ></div>
      <div>
        {cardIds.map((id) => (
          <Card key={id} id={id} isVisible={id === currentId} />
        ))}
      </div>
      <div
        ref={rightButtonRef}
        className="fakeRightButton"
        {...rightButtonProps}
      ></div>
    </main>
  );
}

export default App;
