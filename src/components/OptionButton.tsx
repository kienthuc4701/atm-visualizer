import { Button } from "@/components/ui/button";

interface OptionButtonProps {
  label: string;
  onClick: () => void;
  position: "left" | "right";
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  onClick,
  position,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`absolute ${position === "left" ? "left-2" : "right-2"} w-24`}
    >
      {label}
    </Button>
  );
};
