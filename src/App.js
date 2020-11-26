import React, { useEffect } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import axios from "axios";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = ({ user, signOut, signInWithGithub }) => {
    const updateReadMe = () => {
        axios.put(
            "https://api.github.com/repos/forbesmiyasato/CodingQuestion/contents/README.md",
            {
                message: "message",
                content:
                    "IyBVbmlib29rcwoKaHR0cHM6Ly91bmlib29rcy5pbwoKPGJyIC8+CgojIyMg\nV2VsY29tZSB0byBVbmlib29rcyEKPGhyPgoKVW5pYm9va3MgaXMgYW4gb25s\naW5lIHVuaXZlcnNpdHkgbWFya2V0cGxhY2Ugd2hlcmUgc3R1ZGVudHMgY2Fu\nIGJ1eSwgc2VsbCwgb3IgdHJhZGUgdXNlZCB0ZXh0Ym9va3MgKGFuZCBvdGhl\nciBzdHVmZiB0b28pLiBJdCBjdXJyZW50bHkgc3VwcG9ydHMgUGFjaWZpYyBV\nbml2ZXJpc3R5IGFuZCBQb3J0bGFuZCBTdGF0ZSBVbml2ZXJzaXR5LCBhbmQg\nd2UncmUgd29ya2luZyBvbiBjb3ZlcmluZyBtb3JlIHNjaG9vbHMhCgoKPGJy\nIC8+CgojIyMgVGFibGUgb2YgQ29udGVudHMgPGctZW1vamkgY2xhc3M9Imct\nZW1vamkiIGFsaWFzPSJib29rIiBmYWxsYmFjay1zcmM9Imh0dHBzOi8vZ2l0\naHViLmdpdGh1YmFzc2V0cy5jb20vaW1hZ2VzL2ljb25zL2Vtb2ppL3VuaWNv\nZGUvMWY0ZDYucG5nIj7wn5OWPC9nLWVtb2ppPgo8aHI+CgogIC0gW1dlbGNv\nbWUgdG8gVW5pYm9va3NdKCN3ZWxjb21lLXRvLXVuaWJvb2tzKQogIC0gWyoq\nR2V0IFN0YXJ0ZWQqKl0oI2dldC1zdGFydGVkLSkKICAtIFtVc2FnZV0oI3Vz\nYWdlLSkKICAtIFtUZWNobm9sb2dpZXMvSW50ZWdyYXRpb25zXSgjdGVjaG5v\nbG9naWVzLWludGVncmF0aW9ucy0pCiAgLSBbQ29udHJpYnV0ZV0oI2NvbnRy\naWJ1dGUtKQogIC0gW0Fja25vd2xlZGdlbWVudHNdKCNhY2tub3dsZWRnZW1l\nbnRzLSkKICAtIFtMaWNlbnNlL1N0YXRzL0F1dGhvcl0oI2xpY2Vuc2Utc3Rh\ndHMtYXV0aG9yLSkKCjxiciAvPgoKIyMjIEdldCBTdGFydGVkIDxnLWVtb2pp\nIGNsYXNzPSJnLWVtb2ppIiBhbGlhcz0icm9ja2V0IiBmYWxsYmFjay1zcmM9\nImh0dHBzOi8vZ2l0aHViLmdpdGh1YmFzc2V0cy5jb20vaW1hZ2VzL2ljb25z\nL2Vtb2ppL3VuaWNvZGUvMWY2ODAucG5nIj7wn5qAPC9nLWVtb2ppPgo8aHI+\nCgpWaXNpdCBVbmlib29rcyBhdCBodHRwczovL3VuaWJvb2tzLmlvIGFuZCBz\ndGFydCBwb3N0aW5nIHlvdXIgdGV4dGJvb2tzIGZvciBzYWxlIG9yIGxvb2sg\nZm9yIHRleHRib29rcyB5b3UgbmVlZCEKCjxiciAvPgoKIyMjIFVzYWdlIDxn\nLWVtb2ppIGNsYXNzPSJnLWVtb2ppIiBhbGlhcz0iZ2VhciIgZmFsbGJhY2st\nc3JjPSJodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9p\nY29ucy9lbW9qaS91bmljb2RlLzI2OTkucG5nIj7impk8L2ctZW1vamk+Cjxo\ncj4KaHR0cHM6Ly91bmlib29rcy5pby8/I2hvdy11bmlib29rcy13b3JrcwoK\nCiFbVW5pYm9va3NfVXNhZ2VdKHVuaWJvb2tzX3VzYWdlLnBuZykKCjxiciAv\nPgoKIyMjIFRlY2hub2xvZ2llcywgSW50ZWdyYXRpb25zIDxnLWVtb2ppIGNs\nYXNzPSJnLWVtb2ppIiBhbGlhcz0idG9vbGJveCIgZmFsbGJhY2stc3JjPSJo\ndHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9pY29ucy9l\nbW9qaS91bmljb2RlLzFmOWYwLnBuZyI+8J+nsDwvZy1lbW9qaT4KPGhyPgoK\nICAtIExhbmd1YWdlczogUHl0aG9uLCBKYXZhU2NyaXB0LCBIVE1MLCBDU1MK\nICAtIFBvc3RncmVTUUwKICAtIEZsYXNrCiAgLSBKaW5qYTIKICAtIGpRdWVy\neQogIC0gU2FzcwogIC0gQVdTIFNFUwogIC0gQVdTIFMzCiAgLSBIZXJva3Ug\nKEhvc3RpbmdhIGFuZCBhZGRvbnMgZm9yIGRhdGFiYXNlLCBtb25pdG9yaW5n\nLCBsb2dnaW5nIGFuZCBsb2FkIHRlc3RpbmcpCiAgLSBHb29nbGUgQW5hbHl0\naWNzICYgVGFnIE1hbmFnZXIKICAKPGJyIC8+CgojIyMgQ29udHJpYnV0ZSA8\nZy1lbW9qaSBjbGFzcz0iZy1lbW9qaSIgYWxpYXM9ImhhbmRzaGFrZSIgZmFs\nbGJhY2stc3JjPSJodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2lt\nYWdlcy9pY29ucy9lbW9qaS91bmljb2RlLzFmOTFkLnBuZyI+8J+knTwvZy1l\nbW9qaT4KPGhyPgoKVW5pYm9va3MgaXMgY3VycmVudGx5IGZlYXR1cmUgY29t\ncGxldGUgYW5kIG5vdCBsb29raW5nIGZvciBjb2xsYWJvcmF0b3JzLiBJIG1h\nZGUgdGhpcyB3ZWJzaXRlIHRvIHByb3ZpZGUgYSBmcmVlIHRleHRib29rIHRy\nYWRpbmcgc2VydmljZSBmb3IgdW5pdmVyc2l0eSBzdHVkZW50cy4gV2l0aCB0\naGUgaW50ZW50aW9uIHRoYXQgdGhleSB3b24ndCBncmFkdWF0ZSB3aXRoIGJv\nb2tzIGZyb20gZnJlc2htYW4geWVhciBsaWtlIG1lIGFuZCB3aWxsIGJlIGFi\nbGUgdG8gYXZvaWQgc3BlbmRpbmcgZXh0cmEgbW9uZXkgYXQgdGhlIGJvb2tz\ndG9yZS4KCkNvbnN0cnVjdGl2ZSBmZWVkYmFjayBpcyBhbHdheXMgYXBwcmVj\naWF0ZWQhIEZlZWwgZnJlZSB0byBjb250YWN0IG1lIGF0IGNvbnRhY3RAdW5p\nYm9va3MuaW8gb3IgdmlzaXQgaHR0cHM6Ly91bmlib29rcy5pby9jb250YWN0\ndXMKCjxiciAvPgoKIyMjIEFja25vd2xlZGdlbWVudHMgPGctZW1vamkgY2xh\nc3M9ImctZW1vamkiIGFsaWFzPSJibHVlX2hlYXJ0IiBmYWxsYmFjay1zcmM9\nImh0dHBzOi8vZ2l0aHViLmdpdGh1YmFzc2V0cy5jb20vaW1hZ2VzL2ljb25z\nL2Vtb2ppL3VuaWNvZGUvMWY0OTkucG5nIj7wn5KZPC9nLWVtb2ppPgo8aHI+\nCgpVbmlib29rcyB3YXMgZm91bmRlZCBieSBGb3JiZXMgTWl5YXNhdG8sIHdp\ndGggaW1wbGVtZW50YXRpb24gJiBkZXNpZ24gYXNzaXN0IGZyb20gVGhvbWFz\nIFJvYmFzY2lvdHRpLgoKVGhhbmtzIElzYWFjIFllcCBmb3IgcHJvdmlkaW5n\nIHRoZSBSRUFETUUgdGVtcGxhdGUuCgo8YnIgLz4KCiMjIyBMaWNlbnNlLCBT\ndGF0cywgQXV0aG9yIDxnLWVtb2ppIGNsYXNzPSJnLWVtb2ppIiBhbGlhcz0i\nc2Nyb2xsIiBmYWxsYmFjay1zcmM9Imh0dHBzOi8vZ2l0aHViLmdpdGh1YmFz\nc2V0cy5jb20vaW1hZ2VzL2ljb25zL2Vtb2ppL3VuaWNvZGUvMWY0ZGMucG5n\nIj7wn5OcPC9nLWVtb2ppPgo8aHI+CjwhLS0gYmFkZ2UgY2x1c3RlciAtLT4K\nClRoaXMgcmVwb3NpdG9yeSB3YXMgYXV0aG9yZWQgYnkgKkZvcmJlcyBNaXlh\nc2F0byouCgpDb3B5cmlnaHQgwqkgMjAyMCwgRm9yYmVzIE1peWFzYXRvLiBB\nbGwgcmlnaHRzIHJlc2VydmVkLgoKW0JhY2sgdG8gVGFibGUgb2YgQ29udGVu\ndHNdKCN0YWJsZS1vZi1jb250ZW50cy0pCgo=\n",
                sha: "e86b0ed646f8f15011e268aa0276ee58e2ba954f",
            },
            {
                headers: {
                    Authorization:
                        "token 801a02ad8e9d78639eae6ca43ef60856df0c1fce",
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );
    };

    useEffect(() => {
        // const getAccessToken = async (refreshToken) => {
        //     let response = await axios.post(
        //         "https://github.com/login/oauth/access_token",
        //         {
        //             refreshToken: refreshToken,
        //             grant_type: "refresh_token",
        //             client_id: firebaseConfig.clientID,
        //             client_secret: firebaseConfig.clientSecret,
        //         }
        //     );
        //     return response;
        // };
        // if (user) {
        //     console.log(getAccessToken(user.refreshToken));
        // }
    }, [user]);

    return (
        <div className="App">
            <header className="App-header">
                {user ? (
                    <p>Hello, {user.displayName}</p>
                ) : (
                    <p>Please sign in.</p>
                )}

                {user ? (
                    <>
                        <img src={user.photoURL} style={{width: '200px', height: '200px', borderRadius: '50%'}}/>
                        <br />
                        <button onClick={signOut}>Sign out</button>
                        <button onClick={updateReadMe}>Update ReadMe</button>
                    </>
                ) : (
                    <button onClick={signInWithGithub}>
                        Sign in with Github
                    </button>
                )}
            </header>
        </div>
    );
};

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    githubProvider: new firebase.auth.GithubAuthProvider(),
    scope: "repo",
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App);
