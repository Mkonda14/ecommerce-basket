

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import style from "./slider.module.css";


interface CheckboxSliderProps{
    mMax: {min: number, max: number};
    onChange: Dispatch<SetStateAction<{min: number, max: number}>>;
    value: {min: number, max: number};
    updated: (value: {min: number, max: number}) => void;
}

export const SliderDouble: React.FC<CheckboxSliderProps> = ({ mMax, onChange, value, updated }) => {
    const [percent, setPercent] = useState<{ min: string; max: string }>({ min: '50%', max: '50%' });
    const ref = useRef<HTMLSpanElement>(null);
  
    useEffect(() => {
      if (ref.current) {
        ref.current.style.left = percent.min;
        ref.current.style.right = percent.max;
      }
    }, [percent]);

    useEffect(() => {
        // Initial setting of the percent values based on the initial value props
        setPercent({
          min: `${(value.min * 50) / (mMax.max / 2)}%`,
          max: `${((mMax.max - value.max) * 100) / mMax.max}%`,
        });
    }, [value, mMax.max]);
  
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value);
      onChange((state)=> ({ max: state.max, min: newValue }));
      updated({ max: value.max, min: newValue });
      setPercent({ ...percent, min: `${(newValue * 50) / (mMax.max / 2)}%` });
    };
  
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value);
      onChange((state)=>({ min: state.min, max: newValue }));
      updated({ max: newValue, min: value.min });
      const max = mMax.max;
      const prct = ((max - newValue) * 100) / max;
      setPercent({ ...percent, max: `${prct}%` });
    };
  
    return (
      <div className={style.cntRangeText}>
        <div className={style.cntRange}>
          <span className={style.barSlider}>
            <span ref={ref} className={`${style.slider}`} style={{ left: percent.min, right: percent.max }}></span>
          </span>
          <input
            type="range"
            name="RMin"
            value={value?.min}
            min="0"
            max={mMax.max / 2}
            id="r-min"
            onChange={handleMinChange}
          />
          <input
            type="range"
            name="RMax"
            value={value?.max}
            min={mMax.max / 2}
            max={mMax.max}
            id="r-max"
            onChange={handleMaxChange}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
            <div className="space-x-2">
                <span className="text-base">Min :</span>
                <span className="text-base font-bold">{value.min} $</span>
            </div>
            <div className="space-x-2">
                <span className="text-base">Max :</span>
                <span className="text-base font-bold">{value.max} $</span>
            </div>
        </div>
      </div>
    );
  };
