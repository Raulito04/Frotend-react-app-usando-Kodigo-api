/* eslint-disable react/prop-types */
export default function BootcampCard({ name, description, technologies = [], imageUrl }) {
  return (
    <article className="card">
      {imageUrl && (
        <figure className="card__media">
          <img src={imageUrl} alt={name} loading="lazy" />
        </figure>
      )}

      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__text">{description}</p>
        <div className="card__tags">
          {technologies.map((t, i) => (
            <span className="tag" key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
