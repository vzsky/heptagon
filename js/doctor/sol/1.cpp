#include <bits/stdc++.h>
using namespace std;

const int N = 2e5 + 1;

int n,q;
int s[N], cycle[N], order[N];
bool visited[N];

int cnt;
void dfs(int u,int t){
    if(visited[u]) return;
    visited[u] = true;
    cycle[u] = t, order[u] = ++cnt;
    dfs(s[u],t);
}

bool sameCycle (int a, int b) { return (cycle[a] == cycle[b]); }

bool query () {
    int s, e, a, b; 
    scanf("%d %d %d %d", &s, &e, &a, &b);
    if(!sameCycle(s, e)) {
        return ((sameCycle(a, s) and sameCycle(b, e)) or (sameCycle(a, e) and sameCycle(b, s)));
    }
    else {
        if (!sameCycle(a, s) or !sameCycle(b, s)) return true;
        if (order[s] > order[e]) swap(s, e);
        return !((order[s]<=order[a] and order[a]<order[e]) xor (order[s]<=order[b] and order[b]<order[e]));
    }
    cout << '\n';
}


int main(){
    int c = 0;
    scanf("%d %d", &n, &q);
    for(int i = 1;i <= n;i++) scanf("%d", &s[i]);
    for(int i = 1;i <= n;i++) if(!visited[i]) cnt = 0, dfs(i,++c);
    while(q--) cout << (query()? "DEAD\n":"SURVIVE\n");
}
