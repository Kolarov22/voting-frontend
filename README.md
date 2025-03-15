# E-Voting System

Design choices and updates in the codebase will be written here for the time being.

### Reusable design elements

- Navbar
  - Access to user account where voter information can be uploaded via Account button
  - Elections button will allow users to view all elections in progress or scheduled to happen, these elections are public.
  - Dark/White mode toggle

### Pages

- Account page: Display information about the voter.
- Elections page: Display in progress or scheduled elections, allow the users to go to the specific election page, see information about the election (candidates, time left to vote).
- Election/[id] page: When the election is active, the information mentioned before is displayed, after the election ends, a view presenting scores and statistics is presented.
- Admin page: Used by administrator of the system in order to add new elections, set the time for the election start, add candidates for the election, this page is protected via middleware.
- Help page: For explaining how the system works and guide the user towards casting their vote.
- Landing page: Navbar + Hero with a call to action for the help page.
