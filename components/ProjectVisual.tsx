import Image from 'next/image';

type ProjectVisualProps = {
  kind: 'terminal' | 'duck' | 'kitty' | 'girls';
};

export function ProjectVisual({ kind }: ProjectVisualProps) {
  if (kind === 'duck') {
    return (
      <div className="project-visual project-visual-image">
        <Image
          src="/assets/csfml_img.jpg"
          alt="Screenshot from the Duck Hunt recreation"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
    );
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

  if (kind === 'kitty') {
    return (
      <div className="project-visual kitty-visual" aria-hidden="true">
        <div className="kitty-window">
          <div className="kitty-window-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="kitty-copy">
            <p>Hello Kitty</p>
            <strong>meets Japanese cars.</strong>
          </div>
          <Image
            src="/projects/hellokitty-cars/images/hello-kitty.png"
            alt=""
            width={245}
            height={205}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual terminal-visual" aria-hidden="true">
      <div className="terminal-topbar">
        <span />
        <span />
        <span />
        <p>seedjye@linux</p>
      </div>
      <div className="terminal-body">
        <p><em>$</em> ./my_ls -la</p>
        <p className="terminal-muted">drwxr-xr-x&nbsp;&nbsp;src</p>
        <p className="terminal-muted">-rw-r--r--&nbsp;&nbsp;Makefile</p>
        <p><em>$</em> ./my_top</p>
        <p className="terminal-accent">processes: 142&nbsp;&nbsp;running: 3</p>
        <p><em>$</em> ./my_sudo command</p>
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
