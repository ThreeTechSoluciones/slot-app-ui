interface LoaderProps {
  children?: React.ReactNode;
  text?: string;
}

const Loader = ({ children, text }: LoaderProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {children ? children : <div />}
      <span>{text}</span>
    </div>
  );
};

export default Loader;
