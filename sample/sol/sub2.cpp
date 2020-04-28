#include <bits/stdc++.h>
using namespace std;

int p[200100];
int incycle[200100];
int visited[200100];

int cnt;
void dfs (int u, int c) {
    if (visited[u]) return;
    visited[u] = 1;
    incycle[u] = c;
    dfs(p[u], c);
}

bool same (int a, int b) {
    return incycle[a] == incycle[b];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q; cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> p[i];
    int c = 0;
    for (int i = 1; i <= n; i++) {
        if (visited[i]) continue;
        cnt = 0;
        dfs(i, ++c);
    }

    for (int i = 0; i < q; i++) {
        int s, e, a, b; cin >> s >> e >> a >> b;
        cout << (same(s, e)?"DEAD\n":"SURVIVE\n");
    }
    return 0;
}