interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Success</h2>
      <div className="bg-green-100 p-4 rounded">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
