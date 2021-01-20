import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";
import { context } from "../../context/context";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#FFA500",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(0, 0, 2),
        background: "#FFA500 !important",
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#FFA500 !important`,
        },
    },
    cssFocused: {
        color: "#FFA500 !important",
    },
    notchedOutline: {
        borderWidth: "1px",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const { login } = useContext(context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            await login(email, password);
        } catch {
            setError("Can't log in this user");
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => setEmail(e.target.value)}
                        InputLabelProps={{
                            classes: {
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            inputMode: "numeric",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => setPassword(e.target.value)}
                        InputLabelProps={{
                            classes: {
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            inputMode: "numeric",
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                    <h4 className={classes.error}>{error}</h4>
                    <Grid>
                        <Link to="/register">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
