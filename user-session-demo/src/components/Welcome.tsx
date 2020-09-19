import React from "react";
import { auth, User } from '../firebase';

export const Welcome = (props: {user: User}): JSX.Element => {
  return (
    <div className="jumbotron text-left">
      <h1 className="display-3">Hello,</h1>
      <h2 className="display-4">{props.user.displayName || props.user.email}</h2>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or
        information.</p>
      <hr className="my-4" />
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <button
        className="btn btn btn-outline-danger"
        onClick={(event) => {
          auth.signOut().then(() => {
            window.location.reload();
          });
        }}
      >Sign Out</button>
    </div>
  );
};
