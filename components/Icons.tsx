type IconProps = {
  size?: number;
};

export function ArrowUpRight({ size = 18 }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GithubIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.093.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.112-4.555-4.947 0-1.092.39-1.986 1.029-2.685-.103-.254-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.026A9.56 9.56 0 0 1 12 6.844a9.57 9.57 0 0 1 2.504.337c1.909-1.295 2.747-1.026 2.747-1.026.546 1.379.203 2.396.1 2.65.64.699 1.028 1.593 1.028 2.685 0 3.845-2.339 4.696-4.566 4.944.359.31.678.92.678 1.855 0 1.339-.012 2.42-.012 2.75 0 .267.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M6.5 8.25A1.75 1.75 0 1 0 6.5 4.75a1.75 1.75 0 0 0 0 3.5ZM5 9.75h3v9H5v-9Zm4.75 0h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v4.73h-3v-4.2c0-1 0-2.29-1.4-2.29-1.4 0-1.61 1.09-1.61 2.22v4.27h-3v-9Z" />
    </svg>
  );
}
