function Loading({ length }) {
  return (
    <tbody>
      <tr>
        <td colSpan={length} className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default Loading;
