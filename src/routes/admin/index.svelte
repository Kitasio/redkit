<script context="module">
    export async function load({session}) {
        if(!session.user.authenticated) {
            return {
                status: 302,
                redirect: '/auth/unauthorized',
            }
        }

        return {
            props: {
                email: session.user.email,
            }
        }
    }
</script>

<script lang="ts">
    export let email: string;
</script>
<h1>Admin panel</h1>
{email}