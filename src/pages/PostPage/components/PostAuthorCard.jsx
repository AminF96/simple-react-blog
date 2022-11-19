export default function PostAuthorCard({ author }) {
  return (
    <div className="card mt-5 post-author-card mx-auto border-0">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={author.img} alt="post Author" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{`${author.firstName} ${author.lastName}`}</h5>
            <p className="about-author">{author.about}</p>
            <div className="social-media">
              <span className="me-2">
                <i className="fa fa-instagram"></i>
              </span>
              <span className="me-2">
                <i className="fa fa-linkedin"></i>
              </span>
              <span className="me-2">
                <i className="fa fa-twitter"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
