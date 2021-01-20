import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Copyright from "../../components/Copyright";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
        marginTop: theme.spacing(3),
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

export default function SignUp() {
    const classes = useStyles();
    const { register } = useContext(context);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (password.length < 8) {
                setError("Password must be 6+ character");
                return;
            }
            if (password !== confirmPassword) {
                setError("Password doesn't match");
                return;
            }

            setError("");
            setLoading(true);

            await register(email, password);
        } catch {
            setError("Can't register user with that credential");
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
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={(
                                    e: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) => setConfirmPassword(e.target.value)}
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
                        </Grid>
                    </Grid>
                    <h4 className={classes.error}>{error}</h4>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid>
                        <Link to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
