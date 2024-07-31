interface SearchErrorMessageProps {
  error: any;
}

const SearchErrorMessage: React.FC<SearchErrorMessageProps> = ({ error }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Error</h2>
      <div className="bg-red-100 p-4 rounded">
        <p>{error.error}</p>
        {error.details?.errors?.map((errDetail: any, index: number) => (
          <div key={index}>
            <p>
              <strong>{errDetail.title}</strong>
            </p>
            <p>Code: {errDetail.code}</p>
            <p>{errDetail.detail}</p>
          </div>
        )) || <p>{JSON.stringify(error)}</p>}
      </div>
    </div>
  );
};

export default SearchErrorMessage;
