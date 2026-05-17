interface LoaderProps {
  children: React.ReactNode;
  text?: string;
}

const Loader = ({ children, text }: LoaderProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: ' 50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
      <span>{text}</span>
    </div>
  );
};

export default Loader;
