import clsx from "clsx";
import { useButton } from "react-aria";
import { AnimationEventHandler, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import { CARD_ASSETS } from "./assets";
import { Heart } from "./heart";

export type CardId = keyof typeof CARD_ASSETS;

type CardState = "IDLE" | "ENTERING" | "EXITING" | "NONE";

type Props = {
  id: CardId;
  isVisible?: boolean;
};

export const Card = ({ id, isVisible }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cardState, setCardState] = useState<CardState>("NONE");

  const { buttonProps, isPressed } = useButton(
    {
      elementType: "div",
      onPress: () => {
        if (!isOpen) {
          setIsOpen(true);
          setCardState("NONE");
        }
      },
    },
    ref
  );

  const onAnimationEnd: AnimationEventHandler<HTMLDivElement> = (event) => {
    if (
      event.animationName === styles.enter ||
      event.animationName === styles.exit
    ) {
      setCardState("IDLE");
    }
  };

  useEffect(() => {
    if (isVisible) {
      setCardState("ENTERING");
    } else {
      setCardState("EXITING");
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      data-pressed={isPressed || undefined}
      className={clsx(styles.card, {
        [styles.card_isOpen]: isOpen,
        [styles.card_isVisible]: cardState === "EXITING" || isVisible,
        [styles.card_isIdle]: cardState === "IDLE",
        [styles.card_isEntering]: cardState === "ENTERING",
        [styles.card_isExiting]: cardState === "EXITING",
      })}
      onAnimationEnd={onAnimationEnd}
      {...buttonProps}
    >
      <div className={styles.front}>
        <img src={CARD_ASSETS[id]} className={styles.image} alt="Cat image" />
      </div>
      <div className={styles.back}>
        <Heart />
      </div>
    </div>
  );
};
