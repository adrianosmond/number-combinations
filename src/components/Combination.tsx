type CombinationProps = {
  isHidden?: boolean;
  combination: number[];
};

const Combination = ({ combination }: CombinationProps) => (
  <div>{combination.join(', ')}</div>
);

export default Combination;
