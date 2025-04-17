import { BsInfoCircle } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import { LoaderSpin } from "@/components/loader-spin";

interface FooterProps {
  onReset?: () => void;
  loading: boolean;
  name?: string;
}

export const Footer = ({ onReset, name, loading }: FooterProps) => {
  return (
    <footer className="flex justify-between items-center px-6 p-3 bg-white">
      <Typographie
        component="p"
        className="text-slate-600 flex items-center space-x-4"
      >
        <BsInfoCircle className="size-6 text-blue-600" />
        <span>
          Veuillez crée un <span className="font-semibold">compte</span> si ce n{"'"}est pas fait.
        </span>
      </Typographie>
      <div className="flex gap-x-2">
        <Button variant={"outline"} type="reset" onClick={onReset}>
          Reset form
        </Button>
        <Button disabled={loading}>
          {loading ? <LoaderSpin /> : <span>{name || "Save object"}</span>}
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <FiMoreVertical />
        </Button>
      </div>
    </footer>
  );
};
