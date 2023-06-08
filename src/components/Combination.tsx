import classNames from 'classnames';
import { useState } from 'react';

type CombinationProps = {
  combination: number[];
} & (
  | {
      isHidden?: never;
      hide?: never;
    }
  | {
      isHidden: boolean;
      hide: () => void;
    }
);

const Combination = ({ combination, isHidden, hide }: CombinationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isHidden) return null;

  if (isHidden === undefined) return <div>{combination.join(', ')}</div>;

  return (
    <div>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          hide();
          setIsHovered(false);
        }}
        className="relative"
      >
        {combination.join(', ')}
        {isHidden === false && (
          <span
            className={classNames({
              'absolute -right-8 top-1/2 -mt-2 pl-4': true,
              'opacity-100': isHovered,
              'opacity-0': !isHovered,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-4 h-4 fill-current"
            >
              <path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 121 50t49 120q0 22-5 44t-16 37Zm129 129-40-40q49-36 86-80t53-90q-50-111-150-175t-217-65q-42 0-86 8t-69 19l-46-47q35-16 90-28t106-12q143 0 262 82t173 218q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 22t-89 7q-146 0-265-81T40-500q20-52 56-101t86-95L56-822l42-43 757 757-39 44ZM223-654q-37 27-71 71t-50 83q51 111 154 176t232 64q33 0 65-4t48-12l-64-64q-11 5-27 8t-30 2q-70 0-120-49t-50-121q0-15 3-30t7-27l-97-97Zm305 142Zm-116 58Z" />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
};

export default Combination;
