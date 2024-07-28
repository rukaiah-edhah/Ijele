interface BookingErrorMessageProps {
  error: any;
}

const BookingErrorMessage: React.FC<BookingErrorMessageProps> = ({ error }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Booking Error</h2>
      <div className="bg-red-100 p-4 rounded">
        {typeof error === "string" ? (
          <p>{error}</p>
        ) : (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default BookingErrorMessage;
