const Upload = () => {
    return (
        <form method="post" enctype="multipart/form-data">
            <label htmlFor="file">File</label>
            <input id="file" name="file" type="file" />
            <button>Upload</button>
        </form>
    );
};

export default Upload;