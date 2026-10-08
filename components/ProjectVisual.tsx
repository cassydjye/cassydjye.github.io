type ProjectVisualProps = {
  kind: 'terminal' | 'girls';
  imageUrl?: string | null;
  title?: string;
};

export function ProjectVisual({ kind, imageUrl, title }: ProjectVisualProps) {
  if (imageUrl && /^https:\/\//.test(imageUrl)) {
    return <div className="project-visual project-visual-image"><img src={imageUrl} alt={`Screenshot of ${title || 'project'}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>;
  }

  if (kind === 'girls') {
    return (
      <div className="project-visual girls-visual" aria-hidden="true">
        <div className="girls-card">
          <p className="girls-kicker">Association E-Girls</p>
          <strong>Découvrir. Essayer. Oser.</strong>
          <span>Ateliers · Événements · Métiers</span>
        </div>
      </div>
    );
  }

  // No screenshot yet: use a neutral project-specific cover rather than
  // displaying an unrelated terminal mockup on every project.
  return (
    <div className="project-visual project-cover" aria-label={`Aperçu de ${title || 'projet'} sans capture d'écran`}>
      <div className="project-cover-top"><span>SELECTED WORK</span><span>↗</span></div>
      <div className="project-cover-content">
        <span className="project-cover-symbol" aria-hidden="true">{(title || 'P').trim().slice(0, 1).toUpperCase()}</span>
        <p>{title || 'Projet'}</p>
        <span className="project-cover-caption">APPLICATION · DÉVELOPPEMENT</span>
      </div>
      <div className="project-cover-bottom"><span>PORTFOLIO / PROJECT</span><span>SM.</span></div>
    </div>
  );
}
