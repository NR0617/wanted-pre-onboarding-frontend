const ErrorPage = () => {
    const currentUrl = process.env.REACT_APP_CURRENT_URL;

    return (
        <div>
            <h1>잘못된 접근입니다</h1>
            <p>URL: {`${currentUrl}`}/todo</p>
        </div>
    );
};

export default ErrorPage;
