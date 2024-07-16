import React from 'react';


function Header() {
    return (
        <header className="header">
            <div className="container">
                <h1>Movie Explorer</h1>
                <h4>Discover the world of movies, TV shows, and celebrities. Explore now!</h4>
            </div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="category">New coming</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/popular">Popular</a>
                        </li>

                    </ul>
                </div>

            </nav>
        </header>
    );
}

export default Header;
